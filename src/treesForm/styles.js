import { css } from 'emotion'

const RED = '#ff1212'
const PALE_GREEN = '#f4f5eb'
const DARK_GREEN = '#2b4432'
const CTA = '#6e9366'
const YELLOW = '#ffffa5'


export const tilesWpap = css`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 768px) {

  }
`

export const checkboxesWpap = css`
  margin: 0 auto 1em;
  text-align: left;
  width: 9em;

  @media (min-width: 420px) {
    
  }
`

export const checkboxLabel = css`
  color: ${RED};

  span {
    color: #666;
    font-size: 0.8em;
  }

  @media (min-width: 768px) {
    
  }
`

export const hr = css`
  border: 0;
  height: 0;
  border-top: 1px solid ${CTA};
  border-bottom: 1px solid ${CTA};
`


export const h2 = css`
  color: ${CTA};
  text-transform: none;
  line-height: 2em;
  margin: 0;
  font-size: 1em;

`

export const boxWpap = css`

  padding: 20px;
  text-align: center;
  border: 1px solid green;
  background-color: ${PALE_GREEN};

  @media (min-width: 768px) {
    width: 500px;
    margin: 1em auto;
  }
  
`

export const cta = css`
  width: 100%;
  margin: 0.4em auto;
  background-color: ${CTA};
  font-size: 1em;

  :active, :hover, :visited, :focus{
    background-color: ${CTA};
  }

  @media (min-width: 768px) {
    width: 12em;
    margin: 1em auto;
  }
`
