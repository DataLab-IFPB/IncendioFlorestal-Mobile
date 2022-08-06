import { database } from "../connection";
import { where } from "@nozbe/watermelondb/QueryDescription";

const trailManagerDB = () => {
	const TABLE_TRAIL = "TB_TRAIL";

	async function saveTrailOffline(data, fireIndice) {
		await database.write(async () => {
			await database.get(TABLE_TRAIL).create((trail) => {
				trail.fire_indice = fireIndice;
				trail.initial_latitude = data.initial_coordinates.latitude;
				trail.initial_longitude = data.initial_coordinates.longitude;
				trail.end_latitude = data.end_coordinates.latitude;
				trail.end_longitude = data.end_coordinates.longitude;
			});
		});
	}

	async function fetchTrailsOffline(fireIndice)  {
		const trailCollection = database.get(TABLE_TRAIL);
		const trails = await trailCollection.query().fetch();

		return trails.filter((item) => {
			if (item.fire_indice === fireIndice) {
				return item;
			}
		});
	}

	async function clearTrailsOffline() {
		await database.write(async () => {
			await database.get(TABLE_TRAIL).query().markAllAsDeleted();
		});
	}

	async function deleteTrailOffline(id) {
		return new Promise((resolve) => {
			database.write(async () => {
				const trailCollection = database.get(TABLE_TRAIL);
				await trailCollection.query(where("id", id)).markAllAsDeleted();
			}).finally(() => {
				resolve();
			});
		});
	}

	return{
		saveTrailOffline,
		clearTrailsOffline,
		deleteTrailOffline,
		fetchTrailsOffline
	};
};

export { trailManagerDB };
