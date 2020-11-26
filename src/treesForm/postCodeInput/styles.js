import { css } from 'emotion'
import { CTA, DARK_GREEN } from '../../colorConsts'

export const postcode = css`
  border: 1px solid ${CTA};
  
  font-size: 1.2em;
  line-height: 1.2em;
  padding: .4em 1.2em .3em .6em;
  width: 7em;
  max-width: 80%;
  box-sizing: border-box;
  margin: .8em auto 0;
  border-radius: 6px;

`

export const label = css`
  color: ${CTA};
  font-family: 'IM Fell DW Pica SC', serif !important;
  box-sizing: border-box;
  margin: .8em 0.4em 0;
  width: 6em;
  font-size: 1.4em;
  line-height: 2em;

`

export const error = css`
  color: ${DARK_GREEN};
  font-size: 16px;
  line-height: 18px;
  margin: 1em 0;

  @media (min-width: 400px) {
    font-size: 20px;
    line-height: 22px;
  }
  
  @media (min-width: 768px) {
    font-size: 1.1em;
    line-height: 1.2em;
    margin: .5em 0;
  }

  * {
    font-size: 1em;
  }
`


