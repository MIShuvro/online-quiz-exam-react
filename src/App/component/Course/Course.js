import React from 'react';
import './App.css';
import CardList from './card-list/card-list.component'
import SearchBox from './search-box/search.component'
import Axios from 'axios'

class Course extends React.Component {

  constructor() {
    super()
    this.state = {
      persons: [],
      searchFiled: ''
    }
  }


  async componentDidMount() {
    const response = await Axios.get('https://jsonplaceholder.typicode.com/users')
    const persons = response.data

    this.setState({ persons })
  }
  onChangeEvent = (e) => {
    this.setState({ searchFiled: e.target.value })
  }

  render() {
    return (
      <div className="course">
        < CardList persons={
          this.state.persons
        }
        />
      </div>
    )
  }
}

export default Course;
