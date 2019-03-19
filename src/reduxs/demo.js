
const ADD       = 'ADD';
const REMOVE    = 'REMOVE';
const initstate = 0;

export function demo_reducer(state=initstate,action) {
    console.log('action', action)
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'REMOVE':
            return state - 1;
        default:
            return state;
    }
}
 
export function add(data) {
    return {
        type: ADD
    }
}

export function remove(data) {
    return {
        type: REMOVE,
    }
}