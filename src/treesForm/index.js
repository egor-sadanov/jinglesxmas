import React from 'react'
import TreeTile from './treeTile'
import Checkbox from './checkbox'
import DatesField from './datesField'
import PostCodeInput from './postCodeInput'
import { TREES, LARGE_TREE_NAME } from './trees'
import { ADDITIONAL_ITEMS, STAND_KEY } from './additionalItems'
import {  
  WEEKEND_SURCHARGE, 
  AREA_SURCHARGE, 
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
      formErrorMessage: "Please enter a valid PostCode and select a delivery date",
    }

    this.selectTree = this.selectTree.bind(this)
    this.onAdditionalItemsChange = this.onAdditionalItemsChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeliveryDateChange = this.onDeliveryDateChange.bind(this)
    this.onPostCodeChange = this.onPostCodeChange.bind(this)
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
        total: this.getTotal({tree:tree}) 
      }
    })
  }

  getTotal({
    tree = this.state.selectedTree,
    checkedItems = [...this.state.checkedItemsSet],
    dateSurcharge = this.state.dateSurcharge,
    areaSurcharge = this.state.areaSurcharge,
  }) {
    const additinalItemsPrice = checkedItems.reduce((sum, item) => { 
        if (this.isAddedItemLargeStand(item)) {
          return sum + item.large.price 
        }
        return sum + item.price 
      }, 0
    )
    const areaPrice = areaSurcharge && AREA_SURCHARGE
    const datePrice = dateSurcharge && WEEKEND_SURCHARGE

    return tree.price + additinalItemsPrice + datePrice + areaPrice
  }

  onDeliveryDateChange(deliveryDate) { 
    const dateSurcharge = deliveryDate && (deliveryDate.day() % 6 === 0)
    this.setState((state) => ({ 
      ...state,
      deliveryDate,
      dateSurcharge, 
      isFormValid: this.isFormValid({ deliveryDate }),
      total: this.getTotal({ dateSurcharge }),
    }))
  }

  onPostCodeChange(postCode, valid) { 
    const { deliveryDate, postcodes, postCode: prevPostCode } = this.state

    if (!valid && prevPostCode) { 
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
    // if deliveryDate is selected, but not in avaiable dates, set to null
    if (deliveryDate && !availableDates.find(d => d === deliveryDate.date())){
      newDeliveryDate = null
    }

    if (!postCodeEnum) {
      
    }

    this.setState((state) => ({ 
      ...state,
      postCode,
      areaSurcharge,
      availableDates,
      isFormValid: this.isFormValid({ deliveryDate: newDeliveryDate, postCode }),
      deliveryDate: newDeliveryDate,
      total: this.getTotal({ areaSurcharge }),
    }))
  }

  onAdditionalItemsChange(e) {
    const { checkedItemsSet, disabledItemsSet } = this.state
    const { name : itemName , checked : isChecked} = e.target

    const item = ADDITIONAL_ITEMS.find(i => i.name === itemName)

    if (!isChecked) {
      checkedItemsSet.delete(item)
    } else {
      checkedItemsSet.add(item)
    }
    this.updateInstallation(isChecked, itemName, checkedItemsSet, disabledItemsSet)

    this.setState((state) => ({ 
      ...state,
      checkedItemsSet,
      total: this.getTotal({checkedItems:  [...checkedItemsSet]}),
    }));
  }

  updateInstallation(isChecked, itemName, checkedItemsSet, disabledItemsSet) {
    if (!itemName.includes(STAND_KEY)) { 
      return
    }
    const installation = ADDITIONAL_ITEMS.find(i => i.name === 'installation')
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
    deliveryDate = this.state.deliveryDate, 
    postCode = this.state.postCode,
  }) {
    return !!postCode && !!deliveryDate
  }

  isAddedItemLargeStand(item) {
    const { selectedTree } = this.state
    return item.key === STAND_KEY && selectedTree.name === LARGE_TREE_NAME
  }

  onSubmit(e) {

    console.log(e.target.tree.value)
    console.log(e.target.addOns.value)
    console.log(e.target.postcode.value)
    console.log(e.target.deliveryDay.value)
    console.log(e.target.areaSurcharge.value)
    console.log(e.target.weekendSurcharge.value)
    console.log(e.target.total.value)
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
      postCode,
      selectedTree,
      areaSurcharge,
      dateSurcharge,
    } = this.state

    const treesList = trees.map(tree => (
      <TreeTile tree={tree} key={tree.name} selectTree={this.selectTree}/>
    ))

    const checkboxes = ADDITIONAL_ITEMS.map(item => {
      let labelText = this.getLabelText( 
        this.isAddedItemLargeStand(item) ? item.large : item
      )

      return (
        <div key={item.key}>
          <label className={styles.checkboxLabel}>
            <Checkbox 
              name={item.name} 
              checked={checkedItemsSet.has(item)} 
              disabled={disabledItemsSet.has(item)} 
              onChange={this.onAdditionalItemsChange} 
            />
            {labelText}
          </label>
        </div>
    )})
    
    const additionalItemsNames = [...checkedItemsSet].map(i => {
      if (this.isAddedItemLargeStand(i)){
        return i.large.name
      }
      return i.name
    })

    return (
      <form 
        className={styles.boxWpap} 
        name="trees"  
        method="post"  
        action="/checkout" 
        onSubmit={this.onSubmit}
      >
        <input name="tree" value={selectedTree.name || ''} type="hidden"/>
        <input name="addOns" value={additionalItemsNames || []} type="hidden"/>
        <input name="postcode" value={postCode || 0} type="hidden"/>
        <input name="deliveryDay" value={deliveryDate ? deliveryDate.date() : 0} type="hidden"/>
        <input name="areaSurcharge" value={!!areaSurcharge || false} type="hidden"/>
        <input name="weekendSurcharge" value={!!dateSurcharge || false} type="hidden"/>
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
        <hr className={styles.hr}/>
        <button 
          type="submit"
          className={styles.cta} 
          disabled={!isFormValid}
        >
            {`Buy for $${total}`}
        </button>
        <p>{!isFormValid && formErrorMessage}</p>
      </form>
    )
  }
}



export default TreesForm

TreesForm.propTypes = {

}
