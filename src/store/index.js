import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import loaderSlice from "./loader-slice";
import firesSlice from "./fires-slice";

import reactoTronConfig from "../config/ReactotronConfig";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		fires: firesSlice.reducer,
		loader: loaderSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		immutableCheck: false,
		serializableCheck: false
	}),
	devTools: true,
	enhancers: [reactoTronConfig.createEnhancer()]
});

export default store;
