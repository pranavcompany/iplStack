import { combineReducers } from 'redux'
import {storeData} from './storeData'
 
const todoApp = combineReducers({
    storeData,
  
})
 
export default todoApp