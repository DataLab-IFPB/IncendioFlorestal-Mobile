import { TB_GPS_LOGGER } from "../../../../constants";
import { getRealm } from "../connection";

import { v4 as uuid } from "uuid";

export async function saveTrailOffline(data) {
	const realm = await getRealm();
	realm.write(() => {
		realm.create(TB_GPS_LOGGER, {
			id: uuid(),
			fireId: data.fireId,
			start_latitude: data.start_coordinates.latitude,
			start_longitude:  data.start_coordinates.longitude,
			end_latitude:  data.end_coordinates.latitude,
			end_longitude:  data.end_coordinates.longitude
		});
	});
}

export async function getAllTrailsByFireOffline(fireId) {
	const realm = await getRealm();
	const loggers = realm.objects(TB_GPS_LOGGER)
		.filtered(`fireId = "${fireId}"`);
	return loggers;
}

export async function deleteTrailByIdOffline(id) {
	const realm = await getRealm();
	const logger = realm.objectForPrimaryKey(TB_GPS_LOGGER, id);
	realm.write(() => {
		realm.delete(logger);
	});
}

export async function clearAllTrailsOffline() {
	const realm = await getRealm();
	const loggers = realm.objects(TB_GPS_LOGGER);
	realm.write(() => {
		realm.delete(loggers);
	});
}
