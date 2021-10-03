import ACTIONS from '../actions/'

const restaurants =[]

const restaurantsReducer = (state = restaurants, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_RESTAURANTS:
            return action.payload
        default:
            return state
    }
}

export default restaurantsReducer