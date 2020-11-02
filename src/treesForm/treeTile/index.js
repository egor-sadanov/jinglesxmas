import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import * as trees from '../trees'
import * as styles from './styles'

export const TreeTile = ({ tree = {}, selectTree }) => {

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

  return (
    <>
      <div className={tilesClasses} 
          onClick={() => {selectTree(tree)}}
      >
        <label className={styles.title}>{name}</label>
        <div>{height}</div>
        <hr className={styles.hr}/>
        <div>{`$${price}`}</div>
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
}
