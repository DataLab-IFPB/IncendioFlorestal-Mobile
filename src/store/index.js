import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";
import firesIndicesSlice from "./firesIndicesSlice";

import reactoTronConfig from "../config/ReactotronConfig";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		firesIndices: firesIndicesSlice.reducer,
		loading: loadingSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		immutableCheck: false,
		serializableCheck: false
	}),
	devTools: true,
	enhancers: [reactoTronConfig.createEnhancer()]
});

export default store;
