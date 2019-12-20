import Cookies from 'js-cookie';

const initialState = {
    sessions: {
        email: null,
        token: null
    },
    popupPage: null,
    popupErrMsg: null,
    collectionList:{
        "collections": {
            "5df553709a2f48293c99afdf": {
                "restaurants": [],
                "collaborations": [
                    "5df6614022eb0971498f3b6c"
                ],
                "_id": "5df553709a2f48293c99afdf",
                "name": "The weekend favorite",
                "owner_email": "skborey@gmail.com"
            },
            "5df665c522eb0971498f3d6a": {
                "restaurants": [],
                "collaborations": [],
                "_id": "5df665c522eb0971498f3d6a",
                "name": "New collections new ------4",
                "owner_email": "skborey@gmail.com"
            }
        },
        "restaurants": {},
        "collaborations": {
            "5df6614022eb0971498f3b6c": {
                "_id": "5df6614022eb0971498f3b6c",
                "name": "Borey",
                "email": "skborey@mailsac.com"
            }
        }
    },
    restaurantList:[
        {
            "_id": "5df0f57efe9773b24e74bf40",
            "name": "Osakaya Restaurant",
            "hours": "Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf41",
            "name": "The Stinking Rose",
            "hours": "Mon-Thu, Sun 11:30 am - 10 pm  / Fri-Sat 11:30 am - 11 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf42",
            "name": "Kushi Tsuru",
            "hours": "Mon-Sun 11:30 am - 9 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf43",
            "name": "McCormick & Kuleto's",
            "hours": "Mon-Thu, Sun 11:30 am - 10 pm  / Fri-Sat 11:30 am - 11 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf44",
            "name": "Mifune Restaurant",
            "hours": "Mon-Sun 11 am - 10 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf45",
            "name": "New Delhi Indian Restaurant",
            "hours": "Mon-Sat 11:30 am - 10 pm  / Sun 5:30 pm - 10 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf46",
            "name": "The Cheesecake Factory",
            "hours": "Mon-Thu 11 am - 11 pm  / Fri-Sat 11 am - 12:30 am  / Sun 10 am - 11 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf47",
            "name": "Iroha Restaurant",
            "hours": "Mon-Thu, Sun 11:30 am - 9:30 pm  / Fri-Sat 11:30 am - 10 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf48",
            "name": "Canton Seafood & Dim Sum Restaurant",
            "hours": "Mon-Fri 10:30 am - 9:30 pm  / Sat-Sun 10 am - 9:30 pm"
        },
        {
            "_id": "5df0f57efe9773b24e74bf49",
            "name": "Alioto's Restaurant",
            "hours": "Mon-Sun 11 am - 11 pm"
        }
    ]
}

const cases = {

    INITIALIZE_SESSION: (state, action) => {
        if (action.sessions.email && action.sessions.token) {
            return Object.assign({}, state,
            {
                sessions: action.sessions
            });
        } else {

            Cookies.remove('token');

            return Object.assign({}, state, 
            {
                sessions: {}
            }); 
        }
    },

    /**
     * Header
     */
    SHOW_POPUP: (state, action) => { return Object.assign({}, state,
        {
            popupPage: action.name,
        }
    )},

    RESET_POPUP: (state, action) => { return Object.assign({}, state,
        {
            popupPage: null,
            popupErrMsg: null,
        }
    )},

    REGISTER: (state, action) => {
        if (action.error) { console.error(action);
            return Object.assign({}, state,
            {
                popupErrMsg: "OOP! Something went wrong.",
            });
        } else {
            if (action.message) {
                return Object.assign({}, state,
                {
                    popupErrMsg: action.message,
                });
            } else {

                return Object.assign({}, state,
                {
                    popupErrMsg: "Account is created successfully.",
                });
            }
        }
    },

    LOGIN: (state, action) => {
        if (action.error) {
            return Object.assign({}, state,
            {
                sessions: {},
                popupErrMsg: "OOP! Something went wrong.",
            });
        } else {
            console.log(action);
            if (action.response.success) {
                
                Cookies.set('token', action.response.token, { expires: 1 });

                return Object.assign({}, state, 
                {
                    sessions: { email: action.email, token: action.response.token },
                    popupPage: null,
                    popupErrMsg: null,
                });
            } else {
                return Object.assign({}, state, 
                {
                    sessions: {},
                    // popupPage: null,
                    popupErrMsg: action.response.message,
                });
            }
        }
    },

    LOGOUT: (state, action) => {
        if (action.error) {
            console.log('Not handle yet');
        } else {
            if (action.response.success) {
                
                Cookies.remove('token');

                return Object.assign({}, state, { sessions: {} });
            } else {
                console.log('Not handle yet');
            }
        }
        return state; // Becareful and remember reducer must return state, otherwise other componment maybe gone wrong
    },

    /**
     * Collection List
     */

    ADD_NEW_COLLECTION: (state, action) => {
        // ajax to backend to add new collection
        let newCollection = {
            _id: 'test id',
            title: action.title,
            restaurants: [{id: 'restaurant-' + Math.floor(Math.random() * 100)}],
            collaborations: []
        }

        return Object.assign({}, state, {
            collectionList: [...state.collectionList, newCollection]
        })
    },

    DELETE_COLLECTION: (state, action) => {
        // ajax to backend to delete collection
        
        let newCollectionList = [...state.collectionList]; //in state use immutable state
        newCollectionList.splice(action.id, 1);

        return Object.assign({}, state, {
            collectionList: newCollectionList
        })
    },

    SHOW_RESTAURANT_IN_COLLECTION: (state, action) => {

        // show all restaurant inside the selected collection
        let newRestaurantList = [...state.collectionList[action.index].restaurants]

        return Object.assign({}, state, {
            restaurantList: newRestaurantList
        })
    },

    /**
     * Restaurant List
     */
    ADD_RESTAURANT_TO_COLLECTION: (state, action) => {

        // ajax to backend to add new collection

        return state;
    },

    GET_RESTAURANT_LISTS: (state, action) => {
        return Object.assign({}, state, {
            restaurantList: action.restaurants
        })
    }

}

const reducer = (state = initialState, action) => {
    const handler = cases[action.type]
    return handler ? handler(state, action) : state
}

export default reducer;