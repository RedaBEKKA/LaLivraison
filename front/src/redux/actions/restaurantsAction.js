import ACTIONS from './index'
import axios from 'axios'

export const fetchAllRestaurants = async (token) => {
    const res = await axios.get('/admin/restaurantsInfo', {
        headers: {
            'x-access-token': token
        }
    })
    return res
}

export const dispatchGetAllRestaurants = (res) => {
    return {
        type: ACTIONS.GET_ALL_RESTAURANTS,
        payload: res.data
    }
}