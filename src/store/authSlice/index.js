import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
	uid: null,
	registration: null,
	isAdmin: null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {

		authentication(_, action) {

			const { uid, registration, isAdmin } = action.payload;
			AsyncStorage.setItem("user", JSON.stringify({ uid, registration, isAdmin }));

			return {
				uid,
				registration,
				isAdmin
			};
		},

		logout() {
			return initialState;
		}
	}
});

export default authSlice;
