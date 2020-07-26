import React from 'react'
import Axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Quiz from '../Quiz/Quiz.component'
import swal from 'sweetalert';
import './contentview.css'
class ContentView extends React.Component {
    //const URL ='{{url}}/api/interactiveProtal/view/5dfd27d741e2bb2bd4a82c3f'

    constructor() {
        super()
        this.state = {
            _id: '',
            content: {},
            isAttend: false
        }
    }

    async componentWillMount() {
        const _id = this.props.match.params.id
        this.setState({ _id })
        const URL = await "http://localhost:3001/api/interactiveProtal/view/" + `${this.state._id}`
        const response = await Axios.get(URL)
        const content = response.data.content
        this.setState({ content })

    }


    render() {
        const { title, text, picture, subText } = this.state.content

        const popup = (
            <div>
                {
                    this.state.isAttend ? null : setTimeout(() => {
                        //তুমি কি পরীক্ষায় অংশগ্রহণ করতে চাও নিজেকে যাচাই করার জন্য
                        swal("Do You Want To Take The Quiz?", {
                            buttons: ["No", true],
                        })
                            .then(response => {
                                if (response) {
                                    this.setState({ isAttend: true })
                                }
                            })
                            .catch()
                    }, 5000)
                }
            </div>
        )

        return (
            <div >
                <Navbar />
                <header className="masthead">
                    {this.state.isAttend ? <Quiz /> : <div className="card-list">
                        <div className="card-container">
                            <div className="row">
                                <h2 className="col-8">{title}</h2>
                                <div className="col-8"><p>{text}</p></div>
                                <div className="col-4"><p><img src={picture} alt="img" /></p></div>
                            </div>
                            {this.popup}
                            <div className="row">
                                <p className="col-12">{subText}</p>
                            </div>
                        </div>
                    </div>}


                </header>
                <div className="App">
                    <Footer />
                </div>

            </div>

        )
    }
}

export default ContentView