
import React from 'react'
import { reducerType } from './utils/constant/reducerType'
  
//   export function setToken(id) {
//     return (dispatch ) => {
//         dispatch(
//          type = reducerType.SET_TOKEN,
//          payload= id 
//         )
//     }
//   }

  export function saveDataSuccess(type, data) {
    return { type: reducerType.SET_TOKEN, payload: data };
  }
  
  export function setToken(data) {
 
        return (dispatch) => dispatch(saveDataSuccess(data));
  }