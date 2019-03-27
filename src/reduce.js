import { combineReducers }  from 'redux';
import { Auth }             from "reduxs/auth_redux";
import { userRedux }        from "reduxs/user_redux";
import { userlistRedux }    from "reduxs/userlist_redux";
// 合并reducer
export default combineReducers({
    Auth,
    userRedux, userlistRedux
});