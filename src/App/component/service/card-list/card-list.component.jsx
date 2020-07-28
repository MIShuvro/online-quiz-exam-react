import React from 'react'
import Card from '../card/card.components'
import './card-list.style.css'
const CardList = (props) => {


    return (
        <div className="list">
            {props.persons.map((person, index) =>
                <Card person={person} key={person.id} index={index} />
            )}
        </div>
    )
}
export default CardList