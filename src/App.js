import React from 'react'
import TreesForm from './treesForm'
import * as styles from './styles'

const PrimaryLayout = () => (
  <div className={styles.pageWpap}>
  {/* <a className="facebook" href="https://www.facebook.com/Jinglesxmt" target="_blank" rel="noopener noreferrer">Follow us</a> */}
    <div className={styles.specialOffer}>
      Standard Tree with Cinco stand for $154
      <br/>
      <span>including delivery in Melbourne Area during the week.</span>
    </div>
    <h1 className={styles.h1}>
      Jingles Xmas Trees
    </h1>
    <div className={styles.subTextRed}>
      Are you looking for a real Christmas tree to make your Christmas spectacular? You just found it! Save with our special offer.
    </div>
    <div className={styles.subTextGreen}>
      Our trees are sustainably grown on a farm in Dalesford (VIC).
      With delivery, setup and disposal, you get it all covered.
    </div>
    <TreesForm></TreesForm>
    <div className={styles.car}></div>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: undefined
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ done: true })
    }, 200);
  }

  render() {
    return (
      <>
        {this.state.done ? (
          <PrimaryLayout />
        ) : (
          <h1 className="loading">Jingles Xmas Trees</h1>
        )}
      </>
    );
  }
}

export default App
