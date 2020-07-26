import React from 'react'
import './card.style.css'
const Card = (props) => {

    return (
        <div>
            {props.index < 4 && <div className="course-design">
                <img src={`https://robohash.org/${props.person.id}?size=180x180`} alt="robo" />
                <h2>{props.person.name}</h2>
                <p>{props.person.email}</p>
            </div>}
        </div>
    )
}
export default Card