import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "../../shared/utils/formatDate";

const fires = createSlice({
	name: "fires",
	initialState: {
		filtered: [],
		raw: [],
		clusters: [],
	},
	reducers: {
		loadFires(state, action) {
			const { payload } = action;
			let dateFilter = new Date();
			dateFilter.setDate(dateFilter.getDate() - 1);
			dateFilter = new Date(formatISO(dateFilter));

			if (payload) {
				const fireIndicesFiltered = Object.keys(payload).map((key) => {
					const fireIndice = payload[key];

					return {
						id: key,
						clusterId: fireIndice.cluster,
						active: fireIndice.active,
						brightness: fireIndice.brightness,
						confidence: fireIndice.confidence,
						intensity: fireIndice.frp,
						latitude: fireIndice.longitude,
						longitude: fireIndice.latitude,
						userCreated: fireIndice.userCreated,
						status:
							typeof fireIndice.status === "string"
								? JSON.parse(fireIndice.status)
								: fireIndice.status,
					};
				});

				const filtered = fireIndicesFiltered.filter((item) => {
					const dateFireIndice = new Date(
						item.status.registered_at.split(" ")[0]
					);
					const isInAttendance =
						item.status.in_attendance_at && !item.status.finished_at;

					if (dateFireIndice > dateFilter || isInAttendance) {
						return item;
					}
				});

				const clusters = formatFocosInCluster(filtered);

				return {
					filtered,
					raw: [...fireIndicesFiltered],
					clusters,
				};
			}

			return state;
		},

		loadFiresOffline(state, action) {
			const { payload } = action;

			if (payload) {
				return {
					filtered: [...payload],
					raw: [...payload],
					clusters,
				};
			}

			return state;
		},

		fireFilter(state, action) {
			const { days } = action.payload;
			let limitDate = new Date(formatISO(new Date()));

			if (days > 1) {
				limitDate.setDate(limitDate.getDate() - 1);
				limitDate = new Date(formatISO(limitDate));
			}

			const filtered = state.raw.filter((item) => {
				const dateFireIndice = new Date(
					item.status.registered_at.split(" ")[0]
				);
				const isInAttendance =
					item.status.in_attendance_at && !item.status.finished_at;

				if (dateFireIndice >= limitDate || isInAttendance) {
					return item;
				}
			});

			const clusters = formatFocosInCluster(filtered);

			return {
				filtered,
				raw: state.raw,
				clusters,
			};
		},

		storeFires(state, action) {
			const { payload } = action;
			const filtered = [...state.filtered, payload];
			const raw = [...state.raw, payload];
			const clusters = [...state.clusters];

			return {
				filtered,
				raw,
				clusters,
			};
		},

		updateFire(state, action) {
			const { payload } = action;
			const filtered = state.filtered.filter((item) => item.id !== payload.id);
			const raw = state.raw.filter((item) => item.id !== payload.id);

			return {
				filtered: [...filtered, payload],
				raw: [...raw, payload],
			};
		},
	},
});

function formatFocosInCluster(fireIndices) {
	const clustersMap = new Map();

	for (const fireIndice of fireIndices) {
		const { id, clusterId, ...rest } = fireIndice;
		const foco = { id, clusterId, ...rest };

		const cluster = clustersMap.get(clusterId) || {
			id: id,
			cluster: clusterId,
			focos: [],
		};
		cluster.focos.push(foco);

		clustersMap.set(clusterId, cluster);
	}

	return Array.from(clustersMap.values());
}

export default fires;
