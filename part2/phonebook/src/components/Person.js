import React from 'react';

const Person = ({persons, newFilter, del }) => {
//const peeps = [...persons]

    const toFilter = (person) => person.name.toLowerCase().includes(newFilter.toLowerCase()) === true;

    return (
        <>
            {persons.filter(toFilter)
            .map(person =>
                <div key={person.name}>
                    <p>{person.name} {person.number} <button onClick={del} value={person.name}>delete</button></p>
                    
                </div> 
            )}
        </>
    )
}

export default Person