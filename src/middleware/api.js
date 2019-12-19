import config from '../config.json';
import axios from 'axios';

let API_ENDPOINT = config.api.endpoint;

const apiMiddleware = (store) => (next) => (action) => {
  switch(action.type) {
    case 'API_GET_RESTAURANT_LISTS':
      next(action)
 
      // fetch data from an API that may take a while to respond
      axios.get(API_ENDPOINT + "/restaurants-test")
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
 
    // if we don't need to handle this action, we still need to pass it along
    default: next(action)
  }
}
 
export default apiMiddleware