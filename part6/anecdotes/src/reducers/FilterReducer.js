const FilterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (word) => {
  return {
    type: 'FILTER',
    data: word,
  }
}

export default FilterReducer
