import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

// this creates a rootState type to be used when you are using useSelector in a component to access the global state
export type RootState = ReturnType<typeof store.getState>

export default store;