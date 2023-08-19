import React from 'react'

const Person = ({person, deletePerson}) => {
    return (
      <li>
        <span>{person.name} {person.number}</span> 
        <button onClick={()=>deletePerson(person.id, person.name)}>Delete</button>
      </li>
    )
}

export default Person