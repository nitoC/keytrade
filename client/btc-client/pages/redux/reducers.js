 import { combineReducers } from "redux";
 const Reducer=(users={},action)=>{
    switch(action.type){
        case 'USER_DATA':return action.payload;
        case 'LOGOUT_USER':return action.payload;
        default:return users;
    }
}
export default combineReducers({
    Reducer,
}); 