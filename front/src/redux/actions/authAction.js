import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}
export const fetchUser = async (token) => {
    // console.log(`token 1 fetchUser`, token)
    const res = await axios.get('/user/info', {
        headers: {
            'x-access-token': token
        }
    })
    //console.log(`response from fetch user`, res)
    return res
}
export const dispatchGetUser = (res) => {
   // console.log(`res dispatch`, res)

    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}