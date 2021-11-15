import { applyMiddleware, compose, createStore } from "redux";
import combineReducers from './reducers'
import  thunk from 'redux-thunk'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig={
    key:'root',
    storage
}
const persistedReducer=persistReducer(persistConfig,combineReducers)
 const Store= createStore(persistedReducer,compose(applyMiddleware(thunk)))
 const persistor=persistStore(Store)
 export default {Store,persistor}