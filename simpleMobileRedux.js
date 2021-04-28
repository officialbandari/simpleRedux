const { createStore, combineReducers } = require("redux")


//INITIALSTATE TYPES

const initialMobiles = {
    numberOfMobiles: 1000
}

const initialLapTops = {

    numberOfLaptops: 100
}

//ACTION TYPES 
const BUY_MOBILE = "BUY_MOBILE"
const BUY_LAPTOP = "BUY_LAPTOP"

//ACTION 

const buyMobile = () => {

    return {
        type: BUY_MOBILE
    }


}

const buyLaptops = () => {
    return {
        type: BUY_LAPTOP
    }
}


const mobileReducer = (state = initialMobiles, action) => {

    switch (action.type) {
        case BUY_MOBILE:
            return { numberOfMobiles: state.numberOfMobiles - 1 }
        default:
            return state;
    }

}



const lapTopReducer = (state = initialLapTops, action) => {
    switch (action.type) {
        case BUY_LAPTOP:
            return { numberOfLaptops: state.numberOfLaptops - 1 }
        default:
            return state;
    }

}



const rootReducer = combineReducers({

    mobile: mobileReducer,
    laptops: lapTopReducer

})


const store = createStore(rootReducer)
store.subscribe(() => { console.log(store.getState()) })

store.dispatch(buyMobile())
store.dispatch(buyLaptops())

