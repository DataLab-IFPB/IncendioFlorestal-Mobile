import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	message: "",
	isActive: false
};

const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {

		enableLoading(_, action) {
			return {
				message: action.payload,
				isActive: true
			};
		},

		disableLoading() {
			return initialState;
		}
	}
});

export default loadingSlice;
