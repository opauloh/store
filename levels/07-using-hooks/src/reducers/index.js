import { combineReducers } from 'redux';

import todos from './todos'
import goals from './goals'
import loading from './loading'

export default combineReducers({
  todos, goals, loading
})
