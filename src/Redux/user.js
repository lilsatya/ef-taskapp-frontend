import Immutable from 'seamless-immutable'

// Create Immutable object
const actionTypes = Immutable({
  FAILURE: 'user/FAILURE',
  SIGN_IN: 'user/SIGN_IN',
  SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
  REGISTER: 'user/REGISTER',
  REGISTER_SUCCESS: 'user/REGISTER_SUCCESS',
  USER_LIST: 'user/USER_LIST',
  USER_LIST_SUCCESS: 'user/USER_LIST_SUCCESS'
})

// Actions
export const Failure = (error) => {
  return {
    type: actionTypes.FAILURE,
    error,
  }
}

// Selectors
export const selector = {
  selectData: state => state.user.data,
  selectUsers: state => state.user.users,
  selectError: state => state.user.error
}

// Reducers
export const INITIAL_STATE = Immutable({
  data: {
    id: 1,
    username: 'Lingga'
  },
  error: null,
  users: [{
    id: 1,
    username: 'Lingga'
  }, {
    id: 2,
    username: 'Andi'
  }, {
    id: 3,
    username: 'John'
  }, {
    id: 4,
    username: 'Audrey'
  }]
})

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FAILURE:
      return state.merge({ error: action.error, data: null })
    case actionTypes.SIGN_IN_SUCCESS:
      return state.merge({ data: action.data })
    case actionTypes.REGISTER_SUCCESS:
      return state.merge({ data: action.data })
    case actionTypes.USER_LIST_SUCCESS:
      return state.merge({ users: action.users })
    default:
      return state
  }
}