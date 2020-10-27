
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
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

    // state = {
    //   options: [
    //     {
    //       name: 'Delivery Date…',
    //       value: null,
    //     },
    //     {
    //       name: 'Saturday, 5 Dec',
    //       value: 5,
    //     },
    //     {
    //       name: 'Sunday, 6 Dec',
    //       value: 6,
    //     },
    //     {
    //       name: 'Saturday, 12 Dec',
    //       value: 12,
    //     },
    //     {
    //       name: 'Sunday, 13 Dec',
    //       value: 13,
    //     },
    //     {
    //       name: 'Saturday, 19 Dec',
    //       value: 19,
    //     },
    //     {
    //       name: 'Sunday, 20 Dec',
    //       value: 20,
    //     },
    //   ],
    //   value: null,
    // }


    // handleChange = (event) => {
    //   this.setState({ value: event.target.value })
    // }

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

    isBlocked = day => {
      const availableDates = [1,2,5,6,8,9,12,13,15,16,19,20]
      const result = !availableDates.some(date => {
        return day.isSame(`2020-12-${date}`, 'day')
      })
      return result
    }
    
    // https://github.com/airbnb/react-dates/blob/master/stories/DayPickerSingleDateController.js

    render() {
      const { focused, date } = this.state
  
      return (
        <div className={styles.calendar}>
          {/* <select 
            onChange={this.handleChange} 
            value={value}
            className={styles.datesSelect}>
            {options.map(item => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select> */}
          <DayPickerSingleDateController
            numberOfMonths={1} 
            focused={focused}
            date={date}
            initialVisibleMonth={() => moment('12 2020', 'MM YYYY')}
            isDayBlocked={this.isBlocked}
            noNavButtons={true}
            phrases={{calendarLabel: 'Delivery Date'}}
            hideKeyboardShortcutsPanel={true}
            onDateChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
          />
          
        </div>
      );
    }
  }
  