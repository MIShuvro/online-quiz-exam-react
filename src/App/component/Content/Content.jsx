import React from 'react'
import './creative.min.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './content.style.css'
import Axios from 'axios'

import ContentList from '../Content-list/Content.list'

class Content extends React.Component {

    constructor() {
        super()
        this.state = {
            searchField: '',
            contents: []
        }
    }

    async componentDidMount() {
        // let url = window.location.href
        let searchContent = this.props.match.params.slug
        let searchField;
        if (searchContent.toLowerCase().indexOf('iltes') >= 0) {
            searchField = 'iltes'
        } else if (searchContent.toLowerCase().indexOf('english') >= 0) {
            searchField = 'english'
        } else {

        }
        this.setState({ searchField })
        const URL = await "http://localhost:3001/api/interactiveProtal/" + `${this.state.searchField}`
        const response = await Axios.get(URL)
        const contents = response.data.content
        this.setState({ contents })

    }

    render() {
        return (
            <div >
                <Navbar />
                <header className="masthead">
                    <div className="card-list">
                        <div className="card-container">

                            {this.state.contents && <ContentList contents={this.state.contents} />}

                        </div>
                    </div>
                </header>
                <div className="App">
                    <Footer />
                </div>

            </div>


        )
    }
}

export default Content