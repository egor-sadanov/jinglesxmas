import { css } from 'emotion'
import { RED, DARK_GREEN, YELLOW } from './colorConsts'

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

  @media (min-width: 600px) {
   background-image: url("./images/bg.png"); 
  }
`

export const specialOffer = css`
  color: ${YELLOW};
  background-color: ${RED};
  width: 90%;
  margin: 2vw auto 0;
  padding: 0.4em 0.4em 0.4em 4em;
  font-size: 0.8em;
  line-height: 1.2em;
  border: 1px solid #fff;
  position: relative;

  span {
    font-size: 0.8em;
    line-height: 1.2em;
    color: ${YELLOW};
  }

  ::after {
    content: "";
    background-image: url("./images/bells.png"); 
    background-repeat: no-repeat;
    position: absolute;
    background-size: 110px;
    top:-20px;
    left: -40px;
    height: 130px;
    width: 110px;

    @media (min-width: 768px) {
      background-image: url("./images/bells_desktop.png"); 
      background-size: 15vw; 
      top:-2.4vw;
      left: -10vw;
      height: 18vw; 
      width: 15vw; 
    }
  }

  @media (min-width: 500px) {
    width: 28em;
    padding: 0.5em 0.5em 0.5em 3em;
  }

  @media (min-width: 768px) {
    width: 24em;
    font-size: 1.6vw;
    line-height: 2vw;
    padding: 0.5em 0.5em 0.5em 2.2em;

    span {
      font-size: 0.75em;
    }
  }
`

export const subTextRed = css`
  color: ${RED};
  width: 100%;
  margin: 11em auto 1em;
  font-size: 0.9em;

  @media (min-width: 360px) {
    margin: 0 auto 11em;
  }

  @media (min-width: 400px) {
    margin: 0 auto 12em;
  }

  @media (min-width: 480px) {
    font-size: 1.1em;
    width: 28em;
  }

  @media (min-width: 768px) {
    width: 50vw;
    font-size: 1.7vw;
    line-height: 2vw;
    margin: 0 auto 26vw;
  }
`

export const subTextGreen = css`
  color: ${DARK_GREEN};
  width: 100%;
  margin: 1em auto 0;
  font-size: 0.9em;

  @media (min-width: 500px) {
    width: 32em;
  }
`

export const h1 = css`
  color: ${RED};
  font-size: 2.2em;
  font-family: 'Fondamento', cursive;
  margin: 2vw auto 0;
  overflow: hiddlen;
  white-space: nowrap;

  @media (min-width: 400px) {
    font-size: 2.8em;
  }

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
  height: 179px;
  width: 300px;
  margin: 0 auto;
`
