import React from 'react'
import TreeTile from './treeTile'
import Checkbox from './checkbox'
import DatesField from './datesField'
import PostCodeInput from './postCodeInput'
import CouponInput from './couponInput'
import { TREES, LARGE_TREE_NAME } from './trees'
import { 
  ADDITIONAL_ITEMS, 
  STAND_KEY, 
  INSTALLATION_KEY,
} from './additionalItems'
import {  
  WEEKEND_SURCHARGE, 
  REMOTE_AREA_SURCHARGE, 
  CBD_SURCHARGE, 
  fetchPostCodesFromJson
} from './zones'
import * as styles from './styles'

class TreesForm extends React.Component {

  constructor(props) {
    super(props)

    const defaultTree = TREES[0] || {}
    const defaultAdditionalSelection = ADDITIONAL_ITEMS[0] || {}
    const postcodes = fetchPostCodesFromJson()

    this.state = {
      trees: TREES,
      selectedTree: defaultTree,
      checkedItemsSet: new Set([defaultAdditionalSelection]),
      disabledItemsSet: new Set(),
      total: defaultTree.price + defaultAdditionalSelection.price,
      postcodes,
      areaSurcharge: false,
      dateSurcharge: false,
      postCode: null,
      deliveryDate: null,
      isFormValid: true,
      discount: {},
      formErrorMessage: "Please enter a valid PostCode and select a delivery date",
    }

    this.selectTree = this.selectTree.bind(this)
    this.onAdditionalItemsChange = this.onAdditionalItemsChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeliveryDateChange = this.onDeliveryDateChange.bind(this)
    this.onPostCodeChange = this.onPostCodeChange.bind(this)
    this.onCouponChange = this.onCouponChange.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
  }

  selectTree(tree) {
    this.setState(state => {
      const trees = state.trees.map(item => {
        return {...item, selected: item.name === tree.name}
      })
      return {
        ...state, 
        trees: trees, 
        selectedTree : tree,
        total: this.getTotal({ tree }) 
      }
    })
  }

  getTotal({
    tree = this.state.selectedTree,
    checkedItems = [...this.state.checkedItemsSet],
    dateSurcharge = this.state.dateSurcharge,
    areaSurcharge = this.state.areaSurcharge,
    discount = this.state.discount,
  }) {
    const additinalItemsPrice = checkedItems.reduce((sum, item) => { 
        if (this.isAddedItemLargeStand(item, tree)) {
          return sum + item.large.price 
        }
        return sum + item.price 
      }, 0
    )
    const treePrice = tree.price - ((discount && discount.value) || 0)

    return treePrice + additinalItemsPrice + dateSurcharge + areaSurcharge
  }

  onDeliveryDateChange(deliveryDate) { 
    const dateSurcharge = deliveryDate && (deliveryDate.day() % 6 === 0) ? WEEKEND_SURCHARGE : 0
    const { postCode } = this.state

    this.setState((state) => ({ 
      ...state,
      deliveryDate,
      dateSurcharge, 
      isFormValid: this.isFormValid({ deliveryDate, postCode }),
      total: this.getTotal({ dateSurcharge }),
    }))
  }

  onPostCodeChange(postCode, valid) { 
    const { 
      deliveryDate, 
      postcodes, 
      dateSurcharge,
     } = this.state

    if (!valid) { 
      this.setState((state) => ({ 
        ...state,
        postCode: null,
        isFormValid: false,
        total: this.getTotal({ areaSurcharge: false }),
      }))
      return
    }
    const postCodeEnum = postcodes.find(c => c.code === postCode)
    const availableDates = postCodeEnum ? postCodeEnum.zone.availableDates : []
    const areaSurcharge = postCodeEnum ? postCodeEnum.zone.areaSurcharge : false

    let newDeliveryDate = deliveryDate
    let newDateSurcharge = dateSurcharge

    // if deliveryDate is selected, but not in avaiable dates, set to null
    if (deliveryDate && !availableDates.find(d => d === deliveryDate.date())){
      newDeliveryDate = null
      newDateSurcharge = null
    }

    this.setState((state) => ({ 
      ...state,
      postCode,
      areaSurcharge,
      availableDates,
      isFormValid: this.isFormValid({ deliveryDate: newDeliveryDate, postCode }),
      deliveryDate: newDeliveryDate,
      dateSurcharge: newDateSurcharge,
      total: this.getTotal({ areaSurcharge, dateSurcharge }),
    }))
  }

  onCouponChange(discount) {
    this.setState((state) => ({ 
      ...state,
      discount, 
      total: this.getTotal({ discount: discount || {} }),
    }))
  }

  onAdditionalItemsChange(e) {
    const { checkedItemsSet, isShowInstallationMessage } = this.state
    const { name : itemKey, checked: isChecked } = e.target

    const item = ADDITIONAL_ITEMS.find(i => i.key === itemKey)

    if (!isChecked) {
      checkedItemsSet.delete(item)
    } else {
      checkedItemsSet.add(item)
    }
    // this.updateInstallation(isChecked, itemKey, checkedItemsSet, disabledItemsSet)

    const isShowInstallMessage = this.checkInstallation(isChecked, itemKey, checkedItemsSet)

    this.setState((state) => ({ 
      ...state,
      checkedItemsSet,
      isShowInstallationMessage: isShowInstallMessage === null ? isShowInstallationMessage: isShowInstallMessage,
      total: this.getTotal({checkedItems:  [...checkedItemsSet]}),
    }));
  }

  checkInstallation(isChecked, itemKey, checkedItemsSet) {
    // debugger
    if (itemKey === INSTALLATION_KEY && !isChecked) {
      return false
    }
    if (itemKey === STAND_KEY && isChecked) {
      return false
    }
    if (itemKey === INSTALLATION_KEY && isChecked) {
      const stand = [...checkedItemsSet].find(i => i.key === STAND_KEY)
      return !stand
    } 
    if (itemKey === STAND_KEY && !isChecked) {
      const installation = [...checkedItemsSet].find(i => i.key === INSTALLATION_KEY)
      return !!installation
    }
    return null
  }

  updateInstallation(isChecked, itemKey, checkedItemsSet, disabledItemsSet) {
    if (!itemKey.includes(STAND_KEY)) { 
      return
    }
    const installation = ADDITIONAL_ITEMS.find(i => i.key === INSTALLATION_KEY)

    if (isChecked) {
      disabledItemsSet.delete(installation)
    } else {
      checkedItemsSet.delete(installation)
      disabledItemsSet.add(installation)
    }
  }

  getLabelText(item) {
    return <>{item.label} <span>{`+$${item.price}`}</span></>
  }

  isFormValid ({ 
    deliveryDate, 
    postCode,
  }) {
    return !!postCode && !!deliveryDate
  }

  isAddedItemLargeStand(item, selectedTree) {
    return item.key === STAND_KEY && selectedTree.name === LARGE_TREE_NAME
  }

  /*returns a string day of month with formatted like this:
  / '01'  - zero prepending if number is one digit
  / '10'
  */
  formatDate(date) {
    return date ? ('0' + date.date()).slice(-2) : ''
  }

  formatDeliveryPrice(areaSurcharge = 0, dateSurcharge = 0) {
    return areaSurcharge + dateSurcharge
  }

  formatZone(postCode) {
    const { postcodes } = this.state
    const postCodeEnum = postcodes.find(c => c.code === postCode)
    const zone = postCodeEnum ? postCodeEnum.zone.name : null
    return zone
  }

  formatTree(tree, discount) {
    return (discount && discount.value) ? discount.productKeys[tree.name] : tree.key
  }

  formatAdditionalItemsNames(checkedItemsSet) {
    const { selectedTree } = this.state
    const additionalItemsNames = [...checkedItemsSet].map(i => {
      if (this.isAddedItemLargeStand(i, selectedTree)){
        return i.large.name
      }
      return i.name
    })
    return additionalItemsNames || []
  }

  /* "Remote" | "CBD" | "" */
  formatArea(areaSurcharge) {
    if(areaSurcharge === REMOTE_AREA_SURCHARGE) {
      return 'Remote'
    }
    if(areaSurcharge === CBD_SURCHARGE) {
      return 'CBD'
    }
    return 'Normal'
  }

  onSubmit(e) {
    if(!this.isFormValid(this.state)){
      e.preventDefault()
      this.setState((state) => ({ 
        ...state,
        isFormValid: false,
      }))
      return 
    }

    console.log('tree', e.target.tree.value)
    console.log('addOns', e.target.addOns.value)
    console.log('postcode', e.target.postcode.value)
    console.log('zone', e.target.zone.value)
    console.log('deliveryDay', e.target.deliveryDay.value)
    console.log('area', e.target.area.value)
    console.log('deliveryPrice', e.target.deliveryPrice.value)
    console.log('total', e.target.total.value)
    debugger
  }

  render() {
    const { 
      trees, 
      total, 
      checkedItemsSet, 
      disabledItemsSet, 
      availableDates,
      deliveryDate,
      isFormValid,
      formErrorMessage,
      postcodes,
      selectedTree,
      areaSurcharge,
      dateSurcharge,
      discount,
      postCode,
      isShowInstallationMessage,
    } = this.state

    const treesList = trees.map(tree => (
      <TreeTile 
        tree={tree} 
        key={tree.name} 
        selectTree={this.selectTree}
        discount={discount}
      />
    ))

    const checkboxes = ADDITIONAL_ITEMS.map(item => {
      let labelText = this.getLabelText( 
        this.isAddedItemLargeStand(item, selectedTree) ? item.large : item
      )

      const isShowMessage = item.key === INSTALLATION_KEY && isShowInstallationMessage
      return (
        <div key={item.key}>
          <label className={styles.checkboxLabel}>
            <Checkbox 
              name={item.key} 
              checked={checkedItemsSet.has(item)} 
              disabled={disabledItemsSet.has(item)} 
              onChange={this.onAdditionalItemsChange} 
            />
            {labelText}
          </label>
          {isShowMessage && (
            <p className={styles.installationMessage}>
              {'Please note we only install into stands that have been supplied by us.'}
            </p>
          )}
        </div>
    )})

    return (
      <form 
        className={styles.boxWpap} 
        name="trees"  
        method="post"  
        action="/checkout" 
        onSubmit={this.onSubmit}
      >
        <input name="tree" value={this.formatTree(selectedTree, discount)} type="hidden"/>
        <input name="addOns" value={this.formatAdditionalItemsNames(checkedItemsSet)} type="hidden"/>
        <input name="deliveryDay" value={this.formatDate(deliveryDate)} type="hidden"/>
        <input name="area" value={this.formatArea(areaSurcharge)} type="hidden"/>
        <input name="zone" value={this.formatZone(postCode)} type="hidden"/>
        <input name="deliveryPrice" value={this.formatDeliveryPrice(areaSurcharge, dateSurcharge)} type="hidden"/>
        <input name="total" value={total || 0} type="hidden"/>

        <h2 className={styles.h2}>Order now</h2>
        <hr className={styles.hr}/>
        <div className={styles.tilesWpap}>
          {treesList}
        </div>
        <div className={styles.checkboxesWpap}>
          {checkboxes}
        </div>
        <hr className={styles.hr}/>
        <div className={styles.subTextGreen}>
          Delivery starts in December. Please note! Additional surcharge may be applied for CBD, remote suburbs and weekend deliveries.
        </div>
        <PostCodeInput 
          postcodes={postcodes}
          onPostCodeChange={this.onPostCodeChange}/>
        <DatesField 
          onDeliveryDateChange={this.onDeliveryDateChange}
          availableDays={availableDates}
          deliveryDate={deliveryDate}
        />
        {!!dateSurcharge && (
          <p className={styles.surchargeMessage}>
            {`Weekend surcharge of $${dateSurcharge} has been applied.`}
          </p>
        )}
        <CouponInput 
          onCouponChange={this.onCouponChange}
        />
        <hr className={styles.hr}/>
        <button 
          type="submit"
          className={styles.cta} 
          disabled={!isFormValid}
        >
            {`Buy for $${total}`}
        </button>
        {!isFormValid && (
          <p className={styles.surchargeMessage}>{formErrorMessage}</p>
        )}
      </form>
    )
  }
}



export default TreesForm

TreesForm.propTypes = {

}