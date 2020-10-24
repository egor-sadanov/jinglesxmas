import { css } from 'emotion'
import { RED, CTA } from '../../colorConsts'

export const treeTile = css`
  width: 46%;
  background-color: #fdecd3;
  padding: .5em 0 .5em 2.6em;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: 2px 2px 2px #ddd;
  text-align: center;
  font-size: 0.8em;
  margin: 0.5em;

  background-image: url("./images/tree_card.png"); 
  background-repeat: no-repeat;
  background-size: 3.1em;
  background-position: left 1em bottom .8em;

  @media (min-width: 768px) {
    width: 300px;
    margin: 1em;
    background-size: 3.1em;
  }
`

export const activeClass = css`
  border: 1px solid ${RED};
`

export const bigTree = css`
  background-size: 3.6em;

  @media (min-width: 768px) {
    background-size: 3.6em;
  }
`

export const title = css`
  color: ${RED};
  font-size: 1.5em;
  font-weight: 500;
`

export const hr = css`
  border: 0;
  height: 0;
  border-top: 1px solid ${CTA};
  border-bottom: 1px solid ${CTA};
  margin: 0 3em;
`