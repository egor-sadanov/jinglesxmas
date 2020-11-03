
import React from 'react'
import PropTypes from 'prop-types'
import * as styles from './styles'

const Checkbox = ({ 
  type = 'checkbox', 
  name, 
  checked = false, 
  disabled = false,
  onChange,
}) => { 
  return (
    <input 
      className={styles.input}
      type={type} 
      name={name} 
      checked={checked} 
      disabled={disabled}
      onChange={onChange} 
    />
  )
}


Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox