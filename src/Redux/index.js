import { combineReducers } from 'redux'

export default combineReducers({
  app: require('./app').reducer,
  user: require('./user').reducer
})