import React from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './quiz.css'
import Question from '../Question/Question.component'
import Course from '../Course/Course'


class Quiz extends React.Component {

    constructor() {
        super()
        this.state = {
            min: 0,
            circle: 0,
            stroke: '',
            intervalId: '',
            questions: [],
            easyQuestion: [],
            mediumQuestion: [],
            hardQuestion: [],
            level: 1,
            demoQuestion: '',
            total: 0,
            userAnswer: null,
            runningQuestion: {},
            result: 0,
            status: false,
            notify: '',
        }
    }

    async  componentDidMount() {
        //{{url}}/api/interactiveProtal/
        const response = await Axios.get('http://localhost:3001/api/interactiveProtal/')
        const questions = response.data.question


        this.setState({ questions })
        this.QuestionSetUp()
        this.timerEvent()
        this.initQuiz()
        clearInterval(this.state.intervalId)
    }
    timerEvent = () => {
        let intervalId = setInterval(() => {
            this.setState({ min: this.state.min + 1, intervalId })

            this.circleEvent()
            this.timeOutEvent()
        }, 1000);
    }

    timeOutEvent = () => {
        if (this.state.min > 29) {

            this.timerEvent()
            clearInterval(this.state.intervalId)
            this.initQuiz()
            this.setState({ min: 0, userAnswer: null })
        }
    }
    circleEvent = () => {
        const circle = (this.state.min / 30) * (2 * (22 / 7) * 40);
        var stroke;
        if (this.state.min < 10) {
            stroke = 'rgb(37, 175, 37)'
            this.setState({ stroke })
        } else if (this.state.min > 10 && this.state.min < 20) {
            stroke = '#a80d81'
            this.setState({ stroke })
        } else if (this.state.min > 20 && this.state.min < 31) {
            stroke = 'red'
            this.setState({ stroke })
        }
        this.setState({ circle })
    }

    QuestionSetUp = () => {

        this.state.questions.map(question => {
            if (question.questionLevel === "easy") {
                this.setState({ easyQuestion: [...this.state.easyQuestion, question] })
            } else if (question.questionLevel === "medium") {
                this.setState({ mediumQuestion: [...this.state.mediumQuestion, question] })
            } else if (question.questionLevel === 'hard') {
                this.setState({ hardQuestion: [...this.state.hardQuestion, question] })
            }
        })
    }


    initQuiz = () => {
        let selectQuestion;
        let demoQuestion;
        let total;

        // For Document...
        if (this.state.level === 1) {

            selectQuestion = Math.floor(Math.random() * this.state.easyQuestion.length)
            demoQuestion = this.state.easyQuestion.map((question, index) => {
                if (index === selectQuestion) {
                    this.state.easyQuestion.splice(index, 1)
                    total = this.state.total + 1;
                    this.setState({ total, runningQuestion: question })
                    if (this.state.total < 10) {
                        return (
                            <Question key={index} question={question} skipQuestionHandler={this.skipQuestionHandler}
                                onChangerHandler={this.onChangerHandler} submitAnswer={this.submitAnswer}
                                data={{ uniy: this.state.userAnswer, ChangerHandler: this.ChangerHandler.bind(this) }} />
                        )
                    }
                }
            })
        } else if (this.state.level === 2) {
            selectQuestion = Math.floor(Math.random() * this.state.mediumQuestion.length)
            demoQuestion = this.state.mediumQuestion.map((question, index) => {
                if (index === selectQuestion) {
                    total = this.state.total + 1;
                    this.state.mediumQuestion.splice(index, 1)
                    this.setState({ total, runningQuestion: question })
                    if (this.state.total < 10) {
                        return (
                            <Question key={index} question={question} skipQuestionHandler={this.skipQuestionHandler}
                                onChangerHandler={this.onChangerHandler} submitAnswer={this.submitAnswer}
                                data={{ uniy: this.state.userAnswer, ChangerHandler: this.ChangerHandler.bind(this) }} />
                        )
                    }
                }
            })
        } else if (this.state.level === 3) {
            selectQuestion = Math.floor(Math.random() * this.state.hardQuestion.length)
            demoQuestion = this.state.hardQuestion.map((question, index) => {
                if (index === selectQuestion) {
                    total = this.state.total + 1;
                    this.state.hardQuestion.splice(index, 1)
                    this.setState({ total, runningQuestion: question })
                    if (this.state.total < 10) {
                        return (
                            <Question key={index} question={question} skipQuestionHandler={this.skipQuestionHandler}
                                onChangerHandler={this.onChangerHandler} submitAnswer={this.submitAnswer}
                                data={{ uniy: this.state.userAnswer, ChangerHandler: this.ChangerHandler.bind(this) }} />
                        )
                    }
                }
            })
        }

        this.setState({ demoQuestion })
    }

    ChangerHandler = (userAnswer) => {
        // this.setState({ status: true })
        // this.setState({ [event.target.name]: event.target.value })
        if (userAnswer) {

            this.setState({ userAnswer })
        }

    }
    submitAnswer = () => {
        if (this.state.runningQuestion.answer === parseInt(this.state.userAnswer)) {
            toast("You Are Rock !")
            this.setState({ result: this.state.result + 1 })

        } else {
            toast("So Close !")

        }

        // this.QuestionSetUp()
        if (this.state.level === 1 && this.state.result === 3) {
            this.setState({ level: 2 })
            this.timerEvent()
            clearInterval(this.state.intervalId)
            this.initQuiz()
            this.setState({ min: 0, userAnswer: null })
        } else {
            this.timerEvent()
            clearInterval(this.state.intervalId)
            this.initQuiz()
            this.setState({ min: 0, userAnswer: null })
        }

    }

    questionLevelChange = () => {
        // console.log(`level : ${this.state.level}`)
        // console.log(`result : ${this.state.result}`)
        //  if (this.state.result > 2) {
        //     console.log('next')
        //     this.QuestionSetUp()
        //     this.setState({ level: 2 })
        // }
    }
    skipQuestionHandler = () => {
        this.timerEvent()
        clearInterval(this.state.intervalId)
        this.initQuiz()
        this.questionLevelChange()
        this.setState({ min: 0, userAnswer: null })
    }
    render() {

        return (
            <div className="container">
                <div className="design">
                    {this.state.total < 10 ? <div className="card" style={{ width: "50rem" }}>

                        <div>
                            <div className="header">
                                <ToastContainer autoClose={5000} />
                                Quiz
                            </div>

                            <div className="setOfQuestion">
                                <input type='range' min='1' max='10' value={this.state.total} step='1' class="n n10" />
                            </div>
                            <div className="circular-progress">
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 100 100'
                                    aria-labelledby='title' role='graphic'>
                                    <title id='title'>svg circular progress bar</title>
                                    <circle cx="50" cy="50" r="40" />
                                    <circle cx="50" cy="50" r="40" style={{ strokeDashoffset: `${this.state.circle}`, stroke: `${this.state.stroke}` }} id='pct-ind' />
                                </svg>
                                <p className="pct">{30 - this.state.min}s</p>
                            </div>

                            <label htmlFor="slider" className='sr-only'>range slider</label>
                            <input type="hidden" className="custom-range" id='slider' value={this.state.min} min="0" max="30" />
                        </div>

                        {this.state.demoQuestion}

                    </div> : <div className="course-cart">
                            <h1>Your Marks:{this.state.result}</h1>
                            <Course />
                        </div>}
                </div>
            </div >
        )
    }
}

export default Quiz