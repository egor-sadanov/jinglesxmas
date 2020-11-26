import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import * as trees from '../trees'
import * as styles from './styles'

export const TreeTile = ({ tree = {}, selectTree, discount }) => {

  const {
    name,
    height = '',
    price = '',
    selected,
  } = tree

  let tilesClasses = classNames({
    [styles.treeTile] : true,
    [styles.activeClass] : !!selected,
    [styles.bigTree]: name === trees.LARGE_TREE_NAME,
  })

  const displayPrice = price - ((discount && discount.value) || 0) 

  return (
    <>
      <div className={tilesClasses} 
          onClick={() => { selectTree(tree) }}
      >
        <label className={styles.title}>{name}</label>
        <div className={styles.treeHeight} >{height}</div>
        <hr className={styles.hr}/>
        <div className={styles.price} >{`$${displayPrice}`}</div>
      </div>
    </>
  )
}

export default TreeTile

TreeTile.propTypes = {
  tree: PropTypes.shape({
    name: PropTypes.string,
  }),
  selectTree: PropTypes.func,
  discount: PropTypes.shape({
    value: PropTypes.number,
  }),
}
