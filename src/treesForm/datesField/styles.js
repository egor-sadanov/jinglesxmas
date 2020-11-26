import { css } from 'emotion'
import { RED, CTA } from '../../colorConsts'

export const datesSelect = css`
  border: 1px solid ${CTA};
  color: ${RED} !important;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto 1em;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;

  @media (min-width: 768px) {
    width: 80%;
    max-width: 80%;
  }

`

export const calendar = css`
  
  * {
    font-size: 16px;
  }
    td.CalendarDay__selected, 
    td.CalendarDay__selected:active, 
    td.CalendarDay__selected:hover {
        border: 1px double ${CTA} !important;
        background: ${CTA} !important;
    }

    .DayPicker {
        margin: .6em auto 1em;
    }

    label {
        color: ${CTA};
        font-family: 'IM Fell DW Pica SC', serif;
        margin: .6em auto;
        font-size: 1.4em;
    }

    margin: 1em auto 0;
    text-align: center;

`


