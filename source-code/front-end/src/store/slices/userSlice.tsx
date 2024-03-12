import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user_id: "",
		username: "",
		isAuthenticated: false
		// password: "" We don't want to store the password client-side!!
	},
	reducers: {
		// setUser(state, action){
		// state.username = action.payload.username;
		// state.password = param.payload.password;
		// }
		setUser: (state, action) => {
			state = {...state, ...(action.payload)}
			// This should set state to an object literal that was first
			// cloned from the original state, then had any properties that
			// shared the same name as those in action.payload overwritten
			// by those in action.payload
			// TODO: unit-test this!
		}
	}
})

// export const userActions = userSlice.actions
export const {setUser} = userSlice.actions;