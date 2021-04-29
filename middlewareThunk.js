/*
Required npm packages
npm init -y
npm i redux
npm i redux-logger
npm i redux-thunk 


*/


const { createStore, combineReducers, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;
const axios = require("axios");

//ActionTypes

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";


const initialState = {
    users: [],
    errors: '',
    isLoading: false
}



//Actions
const fetchUsersRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        data: users
    }
}

const fetchUsersFailed = (errors) => {
    return {
        type: FETCH_USER_FAILED,
        data: errors
    }
}


//REDUCERS


const userReducers = (state = initialState, action) => {

    switch (action.type) {

        case FETCH_USER_REQUEST:
            return {
                ...state, isLoading: true
            }

        case FETCH_USER_SUCCESS:
            return {
                isLoading: false,
                users: action.data,
                errors: ''
            }
        case FETCH_USER_FAILED:
            return {
                isLoading: false,
                users: [],
                errors: action.errors
            }
    }

}


//DOING ALL ACTIONS AT ONE PLACE WE HAVE TO ONE FUNCTIONS AND TAKING DISPATCH AS ARGUMENT


const fetchUsers = () => {

    return function (dispatch) {
        // here calling fetchUsersRequest  actions 
        dispatch(fetchUsersRequest())


        //now we have do the async opeartion for getting api calls 

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                let usersdata = response.data;
                // here we calling the fetchUsersSuccess 
                dispatch(fetchUsersSuccess(usersdata))
            })
            .catch(error => {

                //here calling fetchUserFailed actions 
                dispatch(fetchUsersFailed(error))
            })


    }

}



// here we creating the store and append the rootReducer and middlewares like thunk logger 
const store = createStore(userReducers, applyMiddleware(thunk))

//here we subscribe the store with getState method for getting the data 
store.subscribe(() => { console.log(store.getState()) })

// now finally we dispatch actions

store.dispatch(fetchUsers());
