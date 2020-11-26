import moment from 'moment'
import * as postcodes_json from './zones.json'
import * as dates_json from './availableDates.json'

export const WEEKEND_SURCHARGE = 15
export const REMOTE_AREA_SURCHARGE = 15
export const CBD_SURCHARGE = 40

/*
CITY	Thursday	3,5,6,10,12,13,17,19,20
NORTH	Wednesday	2,5,6,9,12,13,16,19,20
WEST	Thursday	3,5,6,10,12,13,17,19,20
WEST/NORTH	Wednesday, Thursday	2,3,5,6,8,9,12,13,16,17,19,20
SOUTH/EAST	Monday, Tuesday	5,6,7,8,12,13,14,15,19,20
SOUTH	Monday, Tuesday, Friday	4,5,6,7,8,11,12,13,14,15,18,19,20
*/
export const ZONES = {
    C2 : {
        name: 'C2',
        areaSurcharge: CBD_SURCHARGE,
        availableDates: [],
    },
    SE : {
        name: 'SE',
        areaSurcharge: false,
        availableDates: [],
    },
    SE1 : {
        name: 'SE1',
        areaSurcharge: REMOTE_AREA_SURCHARGE,
        availableDates: [],
    },
    N : {
        name: 'N',
        areaSurcharge: false,
        availableDates: [],
    },
    N1 : {
        name: 'N1',
        areaSurcharge: REMOTE_AREA_SURCHARGE,
        availableDates: [],
    },
    WN : {
        name: 'WN',
        areaSurcharge: false,
        availableDates: [],
    },
    WN1 : {
        name: 'WN1',
        areaSurcharge: REMOTE_AREA_SURCHARGE,
        availableDates: [],
    },
    S : {
        name: 'S',
        areaSurcharge: false,
        availableDates: [],
    },
    S1 : {
        name: 'S1',
        areaSurcharge: REMOTE_AREA_SURCHARGE,
        availableDates: [],
    },
    W : {
        name: 'W',
        areaSurcharge: false,
        availableDates: [],
    },
    W1 : {
        name: 'W1',
        areaSurcharge: REMOTE_AREA_SURCHARGE,
        availableDates: [],
    },
}

/**
 * Checks todays date. 
 * If it's December, returns a new array with only days after today.
 * Else returns the initial array without modifying.
 */
const getFutureDays = (availableDates) => {
    const todayMonth = moment().month()
    //dec=11
    if (todayMonth !== 11) { 
        return availableDates
    }
    const todayDay = moment().date()
    const futureAvailableDates = availableDates.filter(d => d > todayDay)
    return futureAvailableDates
}
/**
 * reads postcodes from a Json file.
 * returns an array of postcodes, each element is in form
 * {
    code: 3000,
    zone: ZONES.C1
}
 */
export const fetchPostCodesFromJson = () => {
    if (!postcodes_json) {
        return
    }
    // "zone": "C",
    // "availableDates": [3,5,6,10,12,13,17,19,20]
    if (dates_json) {
        const datesJson = dates_json.default
        for (let zone in ZONES) {
            const dates = datesJson.find(d => ZONES[zone].name.startsWith(d.zone))
            ZONES[zone].availableDates = dates ? getFutureDays(dates.availableDates) : []
        }
    }
    
    console.dir(ZONES)
    const postcodes = postcodes_json.default.map(p => {
        return {
            code: p.postcode,
            zone: ZONES[`${p.zone}${!!p.surcharge ? p.surcharge : ''}`]
        }
    })
    return postcodes
}