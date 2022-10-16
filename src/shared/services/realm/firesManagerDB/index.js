import { TB_FIRES } from "../../../../constants";
import { getRealm } from "../connection";

import { v4 as uuid } from "uuid";

export async function saveFireOffline(data) {
	const realm = await getRealm();
	let fireOutbreak;
	realm.write(() => {
		fireOutbreak = realm.create(TB_FIRES, {
			id: uuid(),
			...data,
			latitude: data.longitude,
			longitude: data.latitude,
			status: JSON.stringify(data.status)
		});
	});
	return fireOutbreak;
}

export async function getAllFiresOffline() {
	const realm = await getRealm();
	const fires = realm.objects(TB_FIRES);
	return [...fires];
}

export async function updateFireStatusOfflice(fireId, status) {
	const realm = await getRealm();
	const fireOutbreak = realm.objects(TB_FIRES)
		.filtered(`id = "${fireId}"`)[0];

	realm.write(() => {
		fireOutbreak.status = JSON.stringify(status);
	});
}

export async function clearAllFiresOffline() {
	const realm = await getRealm();
	const fires = realm.objects(TB_FIRES);
	realm.write(() => {
		realm.delete(fires);
	});
}
