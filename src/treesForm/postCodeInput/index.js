
import React from 'react'
import PropTypes from 'prop-types'
import * as styles from './styles'

export default class PostCodeInput extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      valid: true,
      isMissingPostcode: false,
      areaSurcharge: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }

    handleChange = (event) => {
      const number = Number(event.target.value)
      const { onPostCodeChange } = this.props
      if (isNaN(number)) {
        return
      } 

      const valid = (number/1000 | 0) === 3

      let isMissingPostcode = false
      const { postcodes } = this.props
      const postCodeEnum = postcodes.find(c => c.code === number) 
      if(valid) {
        isMissingPostcode = !postCodeEnum
      }
      const areaSurcharge = postCodeEnum ? postCodeEnum.zone.areaSurcharge : false

      onPostCodeChange(number, valid)
      this.setState({ 
        value: number,
        valid,
        isMissingPostcode,
        areaSurcharge,
      })
    }
  
    render() {
      const { valid, value, isMissingPostcode, areaSurcharge } = this.state
  
      return (
        <>
          <label className={styles.label}>Postcode</label>
          <input 
            className={styles.postcode}
            type="text" pattern="[0-9]{4}"
            maxLength={4} minLength={4}
            placeholder="3000"
            name="postcode" value={value} 
            onChange={this.handleChange.bind(this)}
          />
          {areaSurcharge && (
            <p className={styles.error}>
              Delivery area surcharge of ${areaSurcharge} has been applied for selected postcode
            </p>
          )}
          {!valid && (
            <p className={styles.error}>
              Please enter a valid Victorian postcode.
            </p>
          )}
          {isMissingPostcode && (
            <p className={styles.error}>
              {`Oops! It looks like ${value} is out of our delivery range, please call us on `}
                <a href="tel:0411399607">0411399607</a>
              {` for delivery quote to your area.`}
          </p>
          )}

          </>
      );
    }
  }
  
  PostCodeInput.propTypes = {
    onPostCodeChange: PropTypes.func.isRequired,
  }