const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state;
    }
}

export const setNotification = message => {
    return {
        type: 'SET_NOTIFICATION',
        message
    }
}

export const clearNotification = () => ({type: 'CLEAR_NOTIFICATION'})

export default notificationReducer

let timerID

export const notify = (message, time) => {

    return dispatch => {
        dispatch(setNotification(message))
        clearTimeout(timerID)
        timerID = setTimeout(()=> {
            dispatch(clearNotification())
        }, time * 1000)
    }
}