import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./slices/userSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key : "root",
    version : 1,
    storage,
};

const reducer = combineReducers({
    user : user,
});

const persistReducers = persistReducer(persistConfig,reducer);

const store = configureStore({
    reducer : persistReducers,
});

export default store