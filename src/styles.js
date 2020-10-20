import { css } from 'emotion'

const RED = '#ff1212'
const PALE_GREEN = '#f4f5eb'
const DARK_GREEN = '#2b4432'
const CTA = '#6e9366'
const YELLOW = '#ffffa5'

export const pageWpap = css`
  &&& {
    @media (min-width: 768px) {
      font-size: 20px;
      line-height: 26px;
    }
  }
  padding: 20px;
  text-align: center;
  width: 100%;
  background-image: url("./images/mobile_bg.png"); 
  background-repeat: no-repeat;
  background-size: 100%;

  @media (min-width: 768px) {
    background-image: url("./images/bg.png"); 
  }
`

export const subTextRed = css`
  color: ${RED};
  width: 100%;
  margin: 0 auto 6em;

  @media (min-width: 768px) {
    width: 24em;
    margin: 0 auto 22vw;
    // margin: 0 auto 15em;
  }
`

export const specialOffer = css`
  color: ${YELLOW};
  background-color: ${RED};
  width: 100%;
  margin: 1em auto;
  padding: 0.4em;
  font-size: 0.8em;
  line-height: 1.4em;
  border: 1px solid #fff;

  @media (min-width: 768px) {
    width: 24em;
    font-size: 1em;
    line-height: 1.6em;
  }
`

export const subTextGreen = css`
  color: ${DARK_GREEN};
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 28em;
  }
`

export const h1 = css`
  color: ${RED};
  font-size: 2.4em;
  margin-bottom: 0;
  font-family: 'Fondamento', cursive;

  @media (min-width: 768px) {
    font-size: 4.6em;
  }
`

export const car = css`
  background-image: url("./images/truck.png"); 
  // background-image: url("./images/tree_card.png"); 
  background-repeat: no-repeat;
  height: 240px;
  width: 300px;
  margin: 0 auto;
`
