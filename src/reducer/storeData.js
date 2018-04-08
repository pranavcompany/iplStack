import { reducerType } from '../utils/constant/reducerType'
var  initialState = [
    text = ''
] 

export  const storeData = (state = [], action) => {
    switch (action.type) {
        case reducerType.SET_TOKEN :
          return {
            ...state,
             text: action.payload,
            }
        
      default:
        return state
    }
  }