import { createSlice } from "@reduxjs/toolkit";

const firesIndicesSlice = createSlice({
	name: "firesIndices",
	initialState: [],
	reducers: {

		loadFireIndices(_, action) {

			const { payload } = action;

			if( payload ) {
				const fireIndicesFiltered = Object.keys(payload).map((key) => {
					const fireIndice = payload[key];

					return {
						uid: key,
						active: fireIndice.active,
						brightness: fireIndice.brightness,
						confidence: fireIndice.confidence,
						daynight: fireIndice.daynight,
						intensity: fireIndice.frp,
						latitude: fireIndice.longitude,
						longitude: fireIndice.latitude,
						userCreated: fireIndice.userCreated,
						status: fireIndice.status
					};
				});

				return fireIndicesFiltered;
			}

			return [];
		},

		loadFireIndicesOffline(_, action) {

			const { payload } = action;

			if( payload ) {
				return [...action.payload];
			}

			return[];
		},

		storeFireIndice(state, action) {
			return [
				...state,
				action.payload
			];
		},

		updateFireIndice(state, action) {
			const { payload } = action;
			const filter = state.filter((item) => item.id !== payload.id);
			return [...filter, payload];
		}
	}
});

export default firesIndicesSlice;
