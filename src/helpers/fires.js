import { formatDatetime } from "../shared/utils/formatDate";

export function createFireOutbreak(latitude, longitude) {
	return {
		latitude: latitude.toFixed(5),
		longitude: longitude.toFixed(5),
		userCreated: true,
		active: true,
		status: {
			registered_at: formatDatetime(new Date()),
			in_attendance_at: "",
			finished_at: ""
		}
	};
}
