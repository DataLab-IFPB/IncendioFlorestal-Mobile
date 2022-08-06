import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "../../shared/utils/formatDate";

const firesIndicesSlice = createSlice({
	name: "firesIndices",
	initialState: {
		filtered: [],
		raw: []
	},
	reducers: {
		loadFireIndices(state, action) {
			const { payload } = action;
			let dateFilter = new Date();
			dateFilter.setDate(dateFilter.getDate() - 1);
			dateFilter = new Date(formatISO(dateFilter));

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

				const filtered = fireIndicesFiltered.filter((item) => {
					const dateFireIndice = new Date(item.status.registered_at.split(" ")[0]);
					if( dateFireIndice > dateFilter ) {
						return item;
					}
				});

				return {
					filtered,
					raw: [...fireIndicesFiltered]
				};
			}

			return state;
		},

		loadFireIndicesOffline(state, action) {
			const { payload } = action;

			if( payload ) {
				return {
					filtered: [...payload],
					raw: [...payload]
				};
			}

			return state;
		},

		filterFireIndices(state, action) {
			const { days } = action.payload;
			let limitDate = new Date(formatISO(new Date()));

			if( days > 1 ) {
				limitDate.setDate(limitDate.getDate() - 1);
				limitDate = new Date(formatISO(limitDate));
			}

			const filtered = state.raw.filter((item) => {
				const dateFireIndice = new Date(item.status.registered_at.split(" ")[0]);
				if( dateFireIndice >= limitDate ) {
					return item;
				}
			});

			return {
				filtered,
				raw: state.raw
			};
		},

		storeFireIndice(state, action) {
			const { payload } = action;
			const filtered = [...state.filtered, payload];
			const raw = [...state.raw, payload];

			return {
				filtered,
				raw
			};
		},

		updateFireIndice(state, action) {
			const { payload } = action;
			const filtered = state.filtered.filter((item) => item.id !== payload.id);
			const raw = state.raw.filter((item) => item.id !== payload.id);

			return {
				filtered: [...filtered, payload],
				raw: [...raw, payload]
			};
		}
	}
});

export default firesIndicesSlice;
