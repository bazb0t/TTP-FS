import axios from 'axios';

// Action Types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Initial State
const defaultUser = {};

// Action Creators
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

// Thunk Creators
export const auth = (name, email, password, method) => async dispatch => {
    let res;
    try {
        res = await axios.post(`/auth/${method}`, {name, email, password});
    } catch (authError) {
        return dispatch(getUser({error: authError}));
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.post(`/auth/logout`);
        dispatch(removeUser());
    } catch (err) {
        console.error(err)
    }
};

// Reducer
export default function(state = defaultUser, action) {
    switch (action.type) {
        case GET_USER:
            return action.user;
        case REMOVE_USER:
            return defaultUser;
        default:
            return state;
    }
}
