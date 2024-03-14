import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
	key: 'root',
	storage,
	// whitelist: ['user']
	debug: true
};

const rootReducer = combineReducers({
	user: userReducer,
	// other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;

export default store;
