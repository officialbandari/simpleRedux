
const { createStore } = require('redux')



//INITIALSTATE 
const initialState = {
    numberOfLaptops: 100
}

//ACTION 
const buyLaptops = () => {

    return {
        type: 'BUY_LAPTOP'
    }
}


// REDUCER 

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'BUY_LAPTOP':
            return { numberOfLaptops: state.numberOfLaptops - 1 }
    }

}


// STORE 

const store = createStore(reducer)

// console.log(store) using console method we the methods which we perform

// {
//     dispatch: [Function: dispatch],
//     subscribe: [Function: subscribe],
//     getState: [Function: getState],
//     replaceReducer: [Function: replaceReducer],
//     '@@observable': [Function: observable]
//   }

// we connect the subscribe method and Getting the store value 
store.subscribe(() => { console.log(store.getState()); })

// dispatch ACTION

store.dispatch(buyLaptops())
store.dispatch(buyLaptops())
store.dispatch(buyLaptops())
store.dispatch(buyLaptops())