import React from 'react'
import Feed from 'react-instagram-authless-feed'
import TreesForm from './treesForm'
import * as styles from './styles'

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

  scrollToForm() {
    const anchor = document.getElementsByName('trees')[0]
    if(anchor){
      anchor.scrollIntoView({ behavior: "smooth" })
    }
  }

  render() {
    return (
      <>
        {this.state.done ? (
          <>
           <div className={styles.pageWpap}>
             <div className={styles.specialOffer} onClick={this.scrollToForm}>
               Standard Tree with Cinco stand for $154
               <br/>
               <span>including delivery in Melbourne Area during the week.</span>
             </div>
             <div className={styles.subTextRed} onClick={this.scrollToForm}>
                HAVE YOU FOUND A CHEAPER CHRISTMAS TREE ELSEWHERE? 
                PLEASE CONTACT US ON <a href="tel:0411399607">0411399607</a> AND WE WILL BEAT IT BY 5%!
             </div>
             <div className={styles.h1} onClick={this.scrollToForm}>
             </div>
             <div className={styles.subTextGreen}>
              <span className='desktopOnly'>
                Are you looking for a real Christmas tree to make your Christmas spectacular? 
              </span>
               Our trees are sustainably grown on a farm in Daylesford (VIC).
               With delivery, setup and disposal, you get it all covered.
             </div>
             <TreesForm></TreesForm>
             <div className={styles.car}></div>
           </div>
           <Feed userName="jinglesxmastrees" className="Feed" classNameLoading="Loading" limit="4"/>
        </>
        ) : (
          <h1 className="loading">Jingles Xmas Trees</h1>
        )}
      </>
    );
  }
}

export default App