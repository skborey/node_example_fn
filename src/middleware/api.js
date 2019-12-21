import config from '../config.json';
import axios from 'axios';

import T from '../actions/types';

let API = config.api.production;

if (process.env.NODE_ENV === 'development') API = config.api.development;

const apiMiddleware = (store) => (next) => (action) => {

  switch(action.type) {

    case T.API_INITIALIZE_SESSION:

      next(action)
      axios.get(API + "/user", { headers: { Authorization: action.token } })
        .then(res => {
            if (res.data.success) {
                store.dispatch({
                    type: T.INITIALIZE_SESSION,
                    sessions: {
                      email: res.data.email,
                      token: action.token
                    }
                })
            } else {
                store.dispatch({
                    type: T.INITIALIZE_SESSION,
                    sessions: {},
                })
            }
        })
        .catch(err => {
            store.dispatch({
                type: T.INITIALIZE_SESSION,
                sessions: {},
            })
        })

      break;

    case T.API_GET_RESTAURANT_LISTS:

      next(action)
      axios.get(API + "/restaurants")
        .then(res => {
            if (res.data.success) {
                store.dispatch({
                    type: 'GET_RESTAURANT_LISTS',
                    restaurants: res.data.data,
                })
            } else {
                store.dispatch({
                    type: 'GET_RESTAURANT_LISTS',
                    restaurants: [],
                })
            }
        })
        .catch(err => {
            store.dispatch({
                type: 'GET_RESTAURANT_LISTS',
                restaurants: [],
            })
        })
      break;

    case T.API_ADD_NEW_COLLECTION:

      next(action)
      axios.put(API + "/collections", { name: action.name },{ headers: { Authorization: action.token } })
        .then(res => { console.log(res)
            if (res.data.success) {
                store.dispatch({
                    type: 'ADD_NEW_COLLECTION',
                    success: res.data.success,
                    collection: res.data.data[0],
                })
            } else {
                store.dispatch({
                    type: 'ADD_NEW_COLLECTION',
                    success: res.data.success,
                    collection: {}
                })
            }
        })
        .catch(err => {  console.log(err)
            store.dispatch({
                type: 'ADD_NEW_COLLECTION',
                error: err
            })
        })
      break;

    case T.API_DELETE_COLLECTION:

      next(action)
      axios.delete(API + "/collections/" + action.id, { headers: { Authorization: action.token } } )
        .then(res => { console.log('delete collection: ', res)
            if (res.data.success) {
                store.dispatch({
                    type: T.DELETE_COLLECTION,
                    success: res.data.success,
                    message: res.data.message,
                    id: action.id,
                })
            } else {
                store.dispatch({
                    type: T.DELETE_COLLECTION,
                    success: res.data.success,
                    message: res.data.message,
                    id: action.id,
                })
            }
        })
        .catch(err => {  console.log('delete collection: ', err)
            store.dispatch({
                type: T.DELETE_COLLECTION,
                error: err
            })
        })
      break;


    case T.API_REGISTER:

      next(action)
      axios.post(API + "/register", {
        email: action.data.email,
        password: action.data.password
      })
        .then(res => {
            if (res.data.success) {
                store.dispatch({
                    type: T.REGISTER,
                })
            } else { console.log(res); store.dispatch({ type: T.REGISTER, message: res.data.message }); }
        })
        .catch(err => { console.log(err); store.dispatch({ type: T.REGISTER, error: err.message });
        })
      break;

    case T.API_LOGIN:

      next(action)
      axios.post(API + "/login", { 
        email: action.email,
	      password: action.password,
      }).then(res => { store.dispatch(
        {
          type: T.LOGIN,
          email: action.email,
          response: res.data
        })})
      .catch(err => { console.log(err); store.dispatch(
        {
          type: T.LOGIN,
          error: err
        })});
      break;

    case T.API_LOGOUT:

      next(action)
      axios.get(API + "/logout", { 
        headers: { Authorization: action.token }
      }).then(res => { console.log(res); store.dispatch(
        {
          type: T.LOGOUT,
          response: res.data
        })})
      .catch(err => { console.log(err); store.dispatch(
        {
          type: T.LOGOUT,
          error: err
        })});
      break;

    default: next(action)
  }
}
 
export default apiMiddleware