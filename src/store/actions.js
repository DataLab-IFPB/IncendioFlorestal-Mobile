import authSlice from "./authSlice";
import fireIndicesSlice from "./firesIndicesSlice";
import loadingSlice from "./loadingSlice";

const authActions = authSlice.actions;
const firesIndicesActions = fireIndicesSlice.actions;
const loadingActions = loadingSlice.actions;

export {
	authActions,
	firesIndicesActions,
	loadingActions
};
