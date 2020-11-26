import { css } from 'emotion'
import { RED, DARK_GREEN, YELLOW } from './colorConsts'

export const pageWpap = css`
  &&& {
    @media (min-width: 768px) {
      font-size: 22px;
      line-height: 28px;
    }
  }
  * {
    font-family: 'Abhaya Libre', serif;
  }
  padding: 20px;
  text-align: center;
  width: 100%;
  background-image: url("./images/mobile_bg.png"); 
  background-repeat: no-repeat;
  background-size: 100%;
  @media (min-width: 600px) {
   background-image: url("./images/bg-desktop.jpg"); 
  }
`

export const specialOffer = css`
  color: ${YELLOW};
  background-color: ${RED};
  font-weight: 600;
  width: 100%;
  margin: -.6em auto 0;
  padding: 0.2em 0.4em 0.2em 3em;
  font-size: 1em;
  line-height: 1.1em;
  border: 1px solid #fff;
  position: relative;
  span {
    font-weight: 600;
    font-size: 1em;
    line-height: 1.1em;
    color: ${YELLOW};
  }
  ::after {
    content: "";
    position: absolute;
    background-image: url("./images/mult_mobile.png"); 
    background-repeat: no-repeat;
    background-size: contain; 
    top: -10px;
    left: -64px;
    height: 140px;
    width: 116px;
    @media (min-width: 768px) {
      background-image: url("./images/mult.png"); 
      top:-3vw;
      left: -12vw;
      height: 23vw; 
      width: 19vw; 
    }
  }
  @media (min-width: 500px) {
    width: 28em;
    margin: 2vw auto 0;
    padding: 0.5em 0.5em 0.5em 3em;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    width: 25em;
    font-size: 1.8vw;
    line-height: 2.1vw;
    padding: 0.4em 0.3em 0.3em 3.6em;
    span {
      font-size: 0.85em;
    }
  }
`

export const subTextRed = css`
  color: ${RED};
  font-weight: 500;
  width: 90%;
  margin: .2em auto 1em;
  font-size: .8em;
  line-height: 1em;
  letter-spacing: 1px;
  a {
    color: ${RED};
    font-weight: 600;
    font-size: 1em;
    line-height: 1em;
    letter-spacing: 1px;
  }
  @media (min-width: 400px) {
    width: 100%;
    font-size: 0.9em;
    line-height: 1.1em;
    cursor: pointer;
  }
  @media (min-width: 480px) {
    margin: 0 auto 1em;
    font-size: 1.2em;
    width: 20em;
  }
  @media (min-width: 768px) {
    width: 47vw;
    font-size: 1.3vw;
    line-height: 1.4vw;
    font-weight: 600;
    margin: 1vw auto 2vw;
    padding-left: 4em;
  }
`

export const subTextGreen = css`
  color: ${DARK_GREEN};
  width: 100%;
  margin: 1em auto 0;
  font-size: 16px;
  line-height: 18px;
  @media (min-width: 400px) {
    font-size: 20px;
    line-height: 22px;
  }
  .desktopOnly {
    display: none;
  }
  @media (min-width: 500px) {
    width: 32em;
    font-size: 0.9em;
    line-height: 1.1em;
    .desktopOnly {
      display: inline;
      color: ${DARK_GREEN};
      font-size: 1em;
      line-height: 1.1em;
    }
  }
`

export const h1 = css`
  margin: 3vw auto 28vw;
  background-image: url("./images/jingles-logo.png"); 
  background-repeat: no-repeat;
  height: 95px;
  width: 244px;
  cursor: pointer;
  @media (min-width: 768px) {
    background-image: url("./images/jingles-logo_big.png"); 
    background-repeat: no-repeat;
    background-size: contain;
    height: 12vw;
    width: 30vw;
    max-height: 190px;
    max-width: 486px;
    margin: 3vw auto 24vw;
  }
  @media (min-width: 1920px) {
    margin: 3vw auto 30vw;
  }
`

export const car = css`
  background-image: url("./images/truck_new.png"); 
  background-repeat: no-repeat;
  height: 179px;
  width: 300px;
  margin: 0 auto;
`