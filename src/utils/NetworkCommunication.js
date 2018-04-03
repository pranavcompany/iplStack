import {reducerType} from '../reducer/ReducerType';
import { Url } from '../utils/Constant/Url';
import {Alert } from 'react-native';
import {Toast} from "native-base";
import axios from 'axios';
import {strings} from '../universal/i18n'


export const  _postApiCall = (url, type, token, body, dispatch) => {   
  dispatch(fetchIsLoading(reducerType.IS_LOADING, true));
  axios
    .post(`${url}`, body, 
    { headers: {
      "Content-Type": "application/json" ,
      'Authorization': 'Bearer '+ token } 
    })
    .then(function (response) {
      dispatch(fetchIsLoading(reducerType.IS_LOADING, false));
      const response_data = response.data;
      dispatch(fetchDataSuccess(type, response_data))
      
    })
    .catch(function (error) {
      dispatch(fetchIsLoading(reducerType.IS_LOADING, false));
      Alert.alert(error.response.data.error.message)
    
    });
}

export const _getApiCall = (Url, type, token, dispatch ) => {
 
    dispatch(fetchIsLoading(reducerType.IS_LOADING, true));
    axios.get(`${Url}`, {
      headers: { "Content-Type": "application/json" ,
                 'Authorization': 'Bearer '+token} 
    })
    .then(function (response) {
      dispatch(fetchIsLoading(reducerType.IS_LOADING, false));
      const response_data = response.data;
      dispatch(fetchDataSuccess(type, response_data))
     
    })
    .catch(function (error) {
      dispatch(fetchIsLoading(reducerType.IS_LOADING, false));
      Alert.alert(error.response.data.error.message)
      
    });
  }

  export function fetchIsLoading(type, bool) {
    return { type: type, isLoading: bool };
  }
  
  export function fetchDataSuccess(type, data) {
    return { type: type, payload: data };
  }
