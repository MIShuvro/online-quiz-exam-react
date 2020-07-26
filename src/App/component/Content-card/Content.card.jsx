import React from 'react'
import { Link } from 'react-router-dom'
//import ContentView from '../Content-View/ContentView.component'
class ContentCard extends React.Component {

    constructor() {
        super()
        this.state = {
            content: [],
            isClicked: false
        }
    }



    render() {
        return (
            <div>
                <Link to={`/view/${this.props.content._id}`}> <h2>{this.props.content.title}</h2></Link>
                <p>{this.props.content.heading}</p>

            </div>
        )
    }
}

export default ContentCard