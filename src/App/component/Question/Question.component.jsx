import React from 'react'

class Question extends React.Component {
    constructor() {
        super()
        this.state = {
            userAnswer: false
        }

    }



    onChangerHandler = (event) => {
        this.setState({ status: true })
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.value) {

            this.props.data.ChangerHandler(event.target.value)
        }
    }


    render() {

        return (
            <div className="design">
                <div className="quiz-content">
                    <div className="question">
                        <h2>{this.props.question.question}</h2>
                    </div>
                    <div className="text">
                        <div className="male">

                            <input type="radio" id="male"
                                name="userAnswer"

                                value={1}
                                onChange={this.onChangerHandler}
                            />
                            <label htmlFor="male"></label>
                            <h3 >{this.props.question.options[0]}</h3>

                            <input type="radio" id="female"
                                name="userAnswer"

                                value={2}
                                onChange={this.onChangerHandler}
                            // onChange={this.props.onChangerHandler}
                            />
                            <label htmlFor="female"></label>
                            <h3 >{this.props.question.options[1]}</h3>
                        </div>
                    </div>
                    <div>
                        <div className="female">
                            <input type="radio" id="man"
                                name="userAnswer"

                                value={3}
                                //  onChange={this.props.onChangerHandler}
                                onChange={this.onChangerHandler}
                            />
                            <label htmlFor="man"></label>
                            <h3>{this.props.question.options[2]}</h3>
                            <input type="radio" id="women"
                                name="userAnswer"

                                value={4}
                                // onChange={this.props.onChangerHandler}
                                onChange={this.onChangerHandler}
                            />
                            <label htmlFor="women"></label>
                            <h3>{this.props.question.options[3]}</h3>
                        </div>
                    </div>
                </div>
                <div className="event-submit">
                    <button type="button" disabled={!this.state.userAnswer} className="btn btn-success btn-lg" onClick={this.props.submitAnswer}>Submit</button>
                </div>
                <div className="event-skip">
                    <button type="button" className="btn btn-warning btn-lg" onClick={this.props.skipQuestionHandler}>Skip</button>
                </div>
            </div>
        )
    }
}
export default Question