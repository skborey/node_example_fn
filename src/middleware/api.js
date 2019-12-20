import config from '../config.json';
import axios from 'axios';

let API = config.api.production;

if (process.env.NODE_ENV === 'development') API = config.api.development;

const apiMiddleware = (store) => (next) => (action) => {
  switch(action.type) {
    case 'API_GET_RESTAURANT_LISTS':
      next(action)
 
      // fetch data from an API that may take a while to respond
      axios.get(API + "/restaurants")
        .then(res => {
            // successfully received data, dispatch a new action with our data
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
 
    case 'API_REGISTER':
      next(action)
      axios.post(API + "/register", {
        email: action.data.email,
        password: action.data.password
      })
        .then(res => {
          console.log(res);
            if (res.data.success) {
                store.dispatch({
                    type: 'REGISTER',
                    restaurants: res,
                })
            } else { console.log(res); store.dispatch({ type: 'REGISTER', restaurants: [], }) }
        })
        .catch(err => { console.log(err); store.dispatch({ type: 'REGISTER', restaurants: [], })
        })
      break;

    default: next(action)
  }
}
 
export default apiMiddleware