import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import itemReducer from './itemReducer'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  itemReducer
});

export default rootReducer