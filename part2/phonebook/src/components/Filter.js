import React from 'react';

const Filter = ({filter, toFilterChange}) => { 

    return (
        <input value={filter} onChange={toFilterChange}/>
    )
}

export default Filter