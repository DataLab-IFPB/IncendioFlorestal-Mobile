import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";
import fireIndicesSlice from "./firesIndicesSlice";

const authActions = authSlice.actions;
const firesIndicesActions = fireIndicesSlice.actions;
const loadingActions = loadingSlice.actions;

export {
	authActions,
	firesIndicesActions,
	loadingActions
};
