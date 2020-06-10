import React from 'react'

const PersonForm = ({submit, newName, nameChange, newNumber, numberChange}) => {

    return (
        <form onSubmit={submit}>
            <div>
                name: <input value={newName} onChange={nameChange}/>
                <br />
                number: <input value={newNumber} onChange={numberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm