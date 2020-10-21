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
  margin: 0 auto 8em;

  @media (min-width: 768px) {
    width: 50vw;
    font-size: 1.7vw;
    line-height: 2vw;
    margin: 0 auto 26vw;
    // margin: 0 auto 15em;
  }
`

export const specialOffer = css`
  color: ${YELLOW};
  background-color: ${RED};
  width: 90%;
  margin: 1vw auto 0;
  padding: 0.4em;
  padding-left: 2.6em;
  font-size: 0.8em;
  line-height: 1em;
  border: 1px solid #fff;
  position: relative;

  ::after {
    content: "";
    background-image: url("./images/bells.png"); 
    background-repeat: no-repeat;
    position: absolute;
    background-size: 100px;
    top:-20px;
    left: -40px;
    height: 120px;
    width: 100px;

    @media (min-width: 768px) {
      background-image: url("./images/bells_desktop.png"); 
      background-size: 200px;
      top:-30px;
      left: -140px;
      height: 240px;
      width: 200px;
    }
  }

  @media (min-width: 768px) {
    width: 24em;
    font-size: 1em;
    line-height: 1.2em;
    padding: 0.4em;
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

  @media (min-width: 500px) {
    font-size: 4em;
  }

  @media (min-width: 768px) {
    font-size: 7vw;
  }
`

export const car = css`
  background-image: url("./images/truck_new.png"); 
  background-repeat: no-repeat;
  height: 240px;
  width: 300px;
  margin: 0 auto;
`
