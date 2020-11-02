import * as postcodes_json from './zones.json'

export const WEEKEND_SURCHARGE = 25
export const AREA_SURCHARGE = 25

export const ZONES = {
    C1 : {
        name: 'C1',
        areaSurcharge: true,
        availableDates: [1,2,5,6,8,9,12,13,15,16,19,20],
    },
    E : {
        name: 'E',
        areaSurcharge: false,
        availableDates: [1,2,5,6,8,9],
    },
    E1 : {
        name: 'E1',
        areaSurcharge: true,
        availableDates: [1,2,5,6,8,9],
    },
    N : {
        name: 'N',
        areaSurcharge: false,
        availableDates: [1, 2, 3],
    },
    N1 : {
        name: 'N1',
        areaSurcharge: true,
        availableDates: [1, 2, 3],
    },
    S : {
        name: 'S',
        areaSurcharge: false,
        availableDates: [8,9,12,13],
    },
    S1 : {
        name: 'S1',
        areaSurcharge: true,
        availableDates: [8,9,12,13],
    },
    W : {
        name: 'W',
        areaSurcharge: false,
        availableDates: [15,16,19,20],
    },
    W1 : {
        name: 'W1',
        areaSurcharge: true,
        availableDates: [15,16,19,20],
    },
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
    const postcodes = postcodes_json.default.map((p) => {
        return {
            code: p.postcode,
            zone: ZONES[`${p.Zone}${!!p.surcharge ? p.surcharge : ''}`]
        }
    })
    // console.dir(postcodes)
    return postcodes
}