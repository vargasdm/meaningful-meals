import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userID: null,
		username: null,
		jwt: null,
		isLoggedIn: false,
	},
	reducers: {
		loginUser: (state, action) => {
			state.userID = action.payload.userID;
			state.username = action.payload.username;
			state.jwt = action.payload.jwt;
			state.isLoggedIn = true;
		},
		logoutUser: (state) => {
			state.userID = null;
			state.username = null;
			state.jwt = null;
			state.isLoggedIn = false;
		},
	},
});

// export const userActions = userSlice.actions
export const { actions: userActions, reducer: userReducer } = userSlice;
