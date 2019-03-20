import { combineReducers }  from 'redux';
import { Auth }             from "reduxs/auth_redux";
import { demo_reducer }     from "reduxs/demo";

// 合并reducer
export default combineReducers({
    Auth,
    demo_reducer
});