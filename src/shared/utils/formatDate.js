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
	const time = `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}:00`;
	return `${dateFormated} ${time}`;
}

function getMoment() {
	const now = new Date();
	const momentInstance = moment(now);
	const currentHour = momentInstance.format("HH");
	let momentType = "";

	if (currentHour >= 3 && currentHour <= 12) {
		momentType = "D";
	} else {
		momentType = "N";
	}

	return momentType;
}

export {
	getMoment,
	formatISO,
	formatUTC,
	formatDatetime,
	formatDateString
};
