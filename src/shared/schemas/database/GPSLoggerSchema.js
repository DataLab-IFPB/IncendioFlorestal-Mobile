import { TB_GPS_LOGGER } from "../../../constants";

export const GPSLoggerSchema = {
	name: TB_GPS_LOGGER,
	properties: {
		id: "string",
		fireId: "string",
		start_latitude: "float",
		start_longitude: "float",
		end_latitude: "float",
		end_longitude: "float"
	},
	primaryKey: "id"
};

