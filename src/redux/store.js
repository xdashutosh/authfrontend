import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

//for combining all reducers
const rootReducer = combineReducers({user:userReducer});

//persist configuration to pass in persistReducer
const persistConfig={
    key:'root',
    version:1,
    storage,
}

//final persistedReducer to pass in store
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    }),
});

// export the persist store as any custom name(persistor) by passing real redux "store" in it
export const persistor = persistStore(store);

