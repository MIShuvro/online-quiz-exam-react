import React from 'react';
import './css/creative.min.css'
import './App.css';
import Search from './component/Search-Box/Search'
import Footer from './component/Footer/Footer'
import Navbar from './component/Navbar/Navbar'
class App extends React.Component {

  constructor() {
    super()
    this.formRef = React.createRef()
    this.state = {
      siteName: "Interaction Protal",
      siteEmail: "support@interactionprotal.com",
      search: ''
    }
  }

  onClickEvent = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = () => {
    // event.preventDefault()
    // console.log('clicked')
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-10 align-self-end">
                <h1 className="text-uppercase text-white font-weight-bold">YOUR FAVORITE SOURCE OF LEARN SOMETHING</h1>
                <hr className="divider my-4" />
              </div>
              <div className="col-lg-8 align-self-baseline">
                <p className="text-white-75 font-weight-light mb-5">IT IS OUR RESPONSIBILITY TO ENSURE YOUR DESIRED OUTCOME </p>
                <Search state={this.state}
                  onClickEvent={this.onClickEvent}
                  fromRef={this.formRef}
                  submitHandler={this.submitHandler}
                />
              </div>
            </div>
          </div>
        </header>
        <Footer />
      </div >
    )
  }
}

export default App;
