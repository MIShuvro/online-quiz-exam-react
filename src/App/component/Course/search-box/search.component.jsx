import React from 'react'
import './search.style.css'
const SearchBox = (props) => {
    return (

        <input type="search" className="search-box" placeholder={props.placeholder} onChange={props.onChangeEvent} />

    )
}

export default SearchBox