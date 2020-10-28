
import React from 'react'
// import PropTypes from 'prop-types'
// import * as trees from '../trees'
import { DayPickerSingleDateController } from 'react-dates'
import moment from 'moment'
import * as styles from './styles'

export default class DatesField extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      date: null,
      focused: true,
      daySize: 35,
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    const { daySize } = this.state
    let newSize = daySize
    if ( window.innerWidth <= 325 ) {
      newSize = 29
    } else if ( window.innerWidth < 400 ) {
      newSize = 35
    } else {
      newSize = 39
    }
    
    if (daySize === newSize) {
      return
    }
    this.setState({ daySize: newSize })
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.resize.bind(this));
  }

  onDateChange(date) {
    this.setState({ date });
  }

  onFocusChange() {
    // Force the focused states to always be truthy so that date is always selectable
    this.setState({ focused: true });
  }

// 1-2 December (week)
// 5-6 December (weekend)
// 8-9 December (week)
// 12-13 December (weekend)
// 15-16 December (week)
// 19-20 December (weekend)

  availableDates = [1,2,5,6,8,9,12,13,15,16,19,20].map(d => `2020-12-${d<10 ? '0': ''}${d}`)

  isBlocked = day => {
    return !this.availableDates.some(date => day.isSame(date, 'day'))
  }

  // https://github.com/airbnb/react-dates/blob/master/stories/DayPickerSingleDateController.js

  render() {
    const { focused, date, daySize } = this.state
  //daySize={36}
    return (
      <div className={styles.calendar}>
        <label>Delivery Date</label>
        <DayPickerSingleDateController
          numberOfMonths={1} 
          focused={focused}
          date={date}
          daySize={daySize}
          initialVisibleMonth={() => moment('12 2020', 'MM YYYY')}
          isDayBlocked={this.isBlocked}
          noNavButtons={true}
          hideKeyboardShortcutsPanel={true}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
        />
        
      </div>
    );
    }
  }
  