import React from 'react'
import TreeTile from './treeTile'
import Checkbox from './checkbox'
import DatesField from './datesField'
import PostCodeInput from './postCodeInput'
import * as styles from './styles'
import { TREES } from './trees'
import { ADDITIONAL_ITEMS } from './additionalItems'

class TreesForm extends React.Component {

  constructor(props) {
    super(props)

    const defaultTree = TREES[0] || {}
    const defaultAdditionalSelection = ADDITIONAL_ITEMS[0] || {}

    this.state = {
      trees: TREES,
      selectedTree: defaultTree,
      checkedItemsSet: new Set([defaultAdditionalSelection]),
      disabledItemsSet: new Set(),
      total: defaultTree.price + defaultAdditionalSelection.price,
    }
    this.selectTree = this.selectTree.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
        total: this.getTotal({treePrice:tree.price}) 
      }
    })
  }

  getTotal({
    treePrice = this.state.selectedTree.price, 
    checkedItems = [...this.state.checkedItemsSet]
  }) {
    const additinalItemsPrice = checkedItems.reduce(
      (sum, currentValue) => sum + currentValue.price , 0
    )
    return treePrice + additinalItemsPrice
  }

  handleChange(e) {
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
    if (itemName !== 'cincostand') { 
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

  onSubmit(e) {
    e.preventDefault();
    console.log("submit");

    fetch('https://your-node-server-here.com/api/submit-cart', {
        method: 'POST',
        body: JSON.stringify({tree: this.state.selectedTree.name})
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
}

  render() {
    const { trees, total, checkedItemsSet, disabledItemsSet } = this.state

    const treesList = trees.map(tree => (
      <TreeTile tree={tree} key={tree.name} selectTree={this.selectTree}/>
    ))

    const checkboxes = ADDITIONAL_ITEMS.map(item => (
        <div key={item.key}>
          <label className={styles.checkboxLabel}>
            <Checkbox 
              name={item.name} 
              checked={checkedItemsSet.has(item)} 
              disabled={disabledItemsSet.has(item)} 
              onChange={this.handleChange} 
            />
            {item.label} <span>{`+$${item.price}`}</span>
          </label>
        </div>
      ))
    

    return (
      <form 
        className={styles.boxWpap} 
        method="post"     
        onSubmit={this.onSubmit}
      >
        <h2 className={styles.h2}>Order now</h2>
        <hr className={styles.hr}/>
        <div className={styles.tilesWpap}>
          {treesList}
        </div>
        <div className={styles.checkboxesWpap}>
          {checkboxes}
        </div>
        <PostCodeInput />
        <DatesField />
        <hr className={styles.hr}/>
        <button className={styles.cta}>
            {`Buy for $${total}`}
        </button>
      </form>
    )
  }
}



export default TreesForm

TreesForm.propTypes = {

}
