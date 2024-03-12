import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.username = "";
      state.isLoggedIn = false;
    },
  },
});

// export const userActions = userSlice.actions
export const { actions: userActions, reducer: userReducer } = userSlice;
