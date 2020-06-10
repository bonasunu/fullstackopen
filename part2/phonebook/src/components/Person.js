import React from 'react'



const Person = ({persons, newFilter}) => {
    const toFilter = (person) => person.name.toLowerCase().includes(newFilter) === true;

    return (
        <>
            {persons.filter(toFilter)
            .map(person => 
            <p key={person.name}>{person.name} {person.number}</p>
            )}
        </>
    )
}

export default Person