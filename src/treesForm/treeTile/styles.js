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
  font-size: 1em;
  margin: 0.5em;

  background-image: url("./images/tree_card.png"); 
  background-repeat: no-repeat;
  background-size: 2.6em;
  background-position: left 1em bottom .4em;

  @media (min-width: 375px) {
    font-size: 1.1em;
  }

  @media (min-width: 768px) {
    background-position: left 1.2em bottom .4em;
    width: 300px;
    margin: 1em;
  }
`

export const activeClass = css`
  border: 1px solid ${RED};
  label {
    font-weight: 600;
  }
`

export const bigTree = css`
  background-size: 3.1em;
`

export const treeHeight = css`
  font-size: 1em;
  line-height: 1.1em;
  color: ${RED};
`

export const price = css`
  font-size: 1em;
  line-height: 1.1em;
`

export const title = css`
  color: ${RED};
  font-weight: 500;

  font-size: 18px;

  @media (min-width: 375px) {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    font-size: 1.4em;
  }

`

export const hr = css`
  border: 0;
  height: 0;
  border-top: 1px solid ${CTA};
  border-bottom: 1px solid ${CTA};
  margin: 0 20px;

  @media (min-width: 375px) {
    margin: 0 40px;
  }

  @media (min-width: 768px) {
    margin: 0 4em;
  }
`