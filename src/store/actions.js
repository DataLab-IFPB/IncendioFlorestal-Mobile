import authSlice from "./auth-slice";
import loaderSlice from "./loader-slice";
import firesSlice from "./fires-slice";

const authActions = authSlice.actions;
const firesActions = firesSlice.actions;
const loaderActions = loaderSlice.actions;

export {
	authActions,
	firesActions,
	loaderActions
};
