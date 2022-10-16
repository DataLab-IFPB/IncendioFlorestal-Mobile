import { formatDatetime } from "../shared/utils/formatDate";

export function createFireOutbreak(latitude, longitude) {
	return {
		latitude,
		longitude,
		userCreated: true,
		active: true,
		status: {
			registered_at: formatDatetime(new Date()),
			in_attendance_at: "",
			finished_at: ""
		}
	};
}
