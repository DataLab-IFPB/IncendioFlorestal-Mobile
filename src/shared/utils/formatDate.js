import moment from "moment";

function formatUTC(date) {
	if (date === null || date === undefined) {
		return " - ";
	}

	const formatter = moment(date);
	return formatter.format("DD/MM/YYYY");
}

function formatISO(date) {
	const formatter = moment(date);
	return formatter.format("YYYY-MM-DD");
}

function formatDateString(datetime) {
	const [date, time] = datetime.split(" ");
	const [year, month, day] = date.split("-");
	return `${day}/${month}/${year} ${time}`;
}

function formatDatetime(date) {
	const dateFormated = formatISO(date);
	const time = `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
	return `${dateFormated} ${time}`;
}

function getMoment() {
	return moment(new Date()).format("hh:mm a");
}

export {
	getMoment,
	formatISO,
	formatUTC,
	formatDatetime,
	formatDateString
};
