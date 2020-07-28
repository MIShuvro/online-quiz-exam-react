import React from 'react';
import './App.css';
import CardList from './card-list/card-list.component'
import SearchBox from './search-box/search.component'
import Axios from 'axios'

class Services extends React.Component {

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
    const filterData = this.state.persons.filter(person =>
      person.name.toLowerCase().includes(this.state.searchFiled.toLowerCase())
    )

    return (
      <div className="App">
        <h1>Course</h1>
        <SearchBox
          placeholder='Course...'
          onChangeEvent={this.onChangeEvent}
        />
        <CardList persons={filterData} />
      </div>
    )
  }
}

export default Services;
