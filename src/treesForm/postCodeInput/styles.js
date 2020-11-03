import { css } from 'emotion'
import { CTA, DARK_GREEN } from '../../colorConsts'

export const postcode = css`
  border: 1px solid ${CTA};
  
  line-height: 1.3em;
  padding: .6em 1.4em .5em .8em;
  width: 8em;
  max-width: 80%;
  box-sizing: border-box;
  margin: 1em auto 0;
  border-radius: 6px;

`

export const label = css`
  color: ${CTA};
  box-sizing: border-box;
  margin: 1em;
  width: 6em;
  font-size: 1.2em;
  line-height: 2em;

`

export const error = css`
  color: ${DARK_GREEN};
  font-size: 0.9em;
  line-height: 1.6em;
  margin: 1em 0;

  @media (min-width: 768px) {
    font-size: 0.9em;
    margin: .5em 0;
  }

  a {
    font-size: 0.9em;
    line-height: 1.6em;
    font-weight: 600;

    @media (min-width: 768px) {
      font-weight: 500;
    }
  }
`


