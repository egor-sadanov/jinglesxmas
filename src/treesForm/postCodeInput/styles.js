import { css } from 'emotion'
import { RED, CTA } from '../../colorConsts'

export const postcode = css`
  border: 1px solid ${CTA};
  
  line-height: 1.3em;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto 1em;
  border-radius: .5em;

  @media (min-width: 768px) {
    width: 6em;
    max-width: 80%;
  }

`

export const label = css`
  color: ${RED};
  padding: .6em .8em;
  box-sizing: border-box;
  margin: 0 auto 1em;
  border-radius: .5em;

  @media (min-width: 768px) {
    width: 6em;
    font-size: 1.2em;
    line-height: 2em;
  }

`


