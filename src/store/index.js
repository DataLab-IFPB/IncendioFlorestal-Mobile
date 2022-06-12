import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import firesIndicesSlice from './firesIndicesSlice';
import loadingSlice from './loadingSlice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		firesIndices: firesIndicesSlice.reducer,
		loading: loadingSlice.reducer
	}
});

export default store;