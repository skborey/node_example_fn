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
          let response = res.data;
          let payload = {}
          if (response.success) {
            payload = {
              type: T.INITIALIZE_SESSION,
              sessions: {
                email: response.email,
                token: action.token
              }
            }

            // get the user assets for initial initializ the
            

          } else {
            payload = {
              type: T.INITIALIZE_SESSION,
              sessions: {},
            }
          }

          store.dispatch(payload);
        })
        .catch(err => { //err.response.status=401
            store.dispatch({
                type: T.INITIALIZE_SESSION,
                sessions: {},
            })
        })

      break;

    case T.API_GET_RESTAURANTS:

      next(action)
      axios.get(API + "/restaurants")
        .then(res => {
          let response = res.data;
          let payload = (response.success) ? {
              type: T.GET_RESTAURANTS,
              restaurants: response.restaurants,
            } : {
              type: T.GET_RESTAURANTS,
              restaurants: {},
            };

          store.dispatch(payload);
        })
        .catch(err => {
            store.dispatch({
                type: T.GET_RESTAURANTS,
                restaurants: {},
            })
        });
      break;

    case T.API_ADD_NEW_COLLECTION:

      next(action)
      axios.put(API + "/collections", { name: action.name },{ headers: { Authorization: action.token } })
        .then(res => {
            if (res.data.success) {
                store.dispatch({
                    type: T.ADD_NEW_COLLECTION,
                    success: res.data.success,
                    collection: res.data.collection,
                })
            } else {
                store.dispatch({
                    type: T.ADD_NEW_COLLECTION,
                    success: res.data.success,
                    collection: {}
                })
            }
        })
        .catch(err => {  console.log(err)
            store.dispatch({
                type: T.ADD_NEW_COLLECTION,
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

    case T.API_ADD_RESTAURANT_TO_COLLECTION:

      next(action)
      axios.post(API + "/collections/relation", action.body, { headers: { Authorization: action.token } } )
        .then(res => { console.log('add restaurant to collection: ', res)
            if (res.data.success) {
                store.dispatch({
                    type: T.ADD_RESTAURANT_TO_COLLECTION,
                    success: res.data.success,
                    message: res.data.message,
                })
            } else {
                 store.dispatch({
                    type: T.ADD_RESTAURANT_TO_COLLECTION,
                    success: res.data.success,
                    message: res.data.message,
                })
            }
        })
        .catch(err => {  console.log('delete collection: ', err)
            store.dispatch({
                type: T.ADD_RESTAURANT_TO_COLLECTION,
                error: err
            })
        })
      break;
    
    case T.API_ADD_NEW_COLLABORATOR:

      next(action)
      axios.put(API + "/collaborations", action.body, { headers: { Authorization: action.token } } )
        .then(res => { console.log('Add new colloborator to collection: ', res)
            if (res.data.success) {
                store.dispatch({
                    type: T.ADD_NEW_COLLABORATOR,
                    success: res.data.success,
                    message: res.data.message,
                    collaborator: res.data.collaborator,
                    relationC2C: res.data.relationC2C,
                })
            } else {
                store.dispatch({
                    type: T.ADD_NEW_COLLABORATOR,
                    success: res.data.success,
                    message: res.data.message,
                })
            }
        })
        .catch(err => {  console.log('Add new colaborator to collection: ', err)
            store.dispatch({
                type: T.ADD_NEW_COLLABORATOR,
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