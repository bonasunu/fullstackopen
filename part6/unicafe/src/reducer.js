const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changeStateGood = {
        ...state,
        good: state.good + 1
      }
      state = {...changeStateGood}
      return state
    case 'OK':
      const changeStateOk = {
        ...state,
        ok: state.ok + 1
      }
      state = {...changeStateOk}
      return state
    case 'BAD':
      const changeStateBad = {
        ...state,
        bad: state.bad + 1
      }
      state = {...changeStateBad}
      return state
    case 'ZERO':
      state = {...initialState}
      return state
    default: return state
  }
  
}

export default counterReducer