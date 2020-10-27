
import React, { PureComponent } from 'react'
import * as styles from './styles'

export default class PostCodeInput extends PureComponent {
  
  constructor(props) {
    super(props)
    this.state = {
      value: null,
      valid: true,
      cbdSurcharge: false,
    }
  }

    handleChange = (event) => {
      const number = Number(event.target.value)
      if (isNaN(number)) {
        return
      } 
      const valid = (number/1000 | 0) === 3

      const cbdSurcharge = valid && number <= 3008

      this.setState({ 
        value: event.target.value,
        valid,
        cbdSurcharge,
      })
    }
  
    render() {
      const { valid } = this.state
  
      return (
        <>
        <label className={styles.label}>Postcode</label>
        <input 
          className={styles.postcode}
          type="text" pattern="[0-9]{4}"
          maxLength={4} minLength={4}
          placeholder="3000"
          name="title" value={this.state.value} 
          onChange={this.handleChange.bind(this)}
          />
        {!valid && <p>Please enter a valid Victorian postcode.</p>}
        </>
      );
    }
  }
  