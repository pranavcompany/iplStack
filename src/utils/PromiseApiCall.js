import React, { Component } from 'react';
import promise from 'promise';
import axios from 'axios';
import { View, Text, Alert } from 'react-native';


export const getApiCallWithPromise = (url,token) => {
    return new promise(function (resolve, reject) {
        axios.get(`${url}`,
                 {
                    headers: {
                        "Content-Type": "application/json",
                        token: token
                      }
                 }
                 ).then(response => {
                         resolve(response);
                 })
                 .catch(error => {
                    reject(error);
                 Alert.alert('Error '+error.response.data);
                 })          
            })
    }

    export const postApiCallWithPromise = (url, body, token) => {
        return new promise(function (resolve, reject) {
            axios.post(`${url}`,body,
                     {
                        headers: {
                            "Content-Type": "application/json",
                            token:  token
                        }
                     }
                     ).then(response => {
                             resolve(response);
                     })
                     .catch(error => {
                        reject(error);
                     Alert.alert(''+error.response.data);
                     })          
                })
        }