import React from 'react'
import Person from './Person'

const Persons = ({persons, filter, deletePerson}) => {
    return(
        <ul>
            {persons.filter(person => 
                person.name.toLowerCase().includes(filter.toLowerCase())).map(filteredData =>  
                (<Person key={filteredData.id} person={filteredData} deletePerson={deletePerson} />))}
        </ul>
    )
}

export default Persons