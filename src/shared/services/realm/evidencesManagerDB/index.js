import { TB_EVIDENCES } from "../../../../constants";
import { getRealm } from "../connection";

import { v4 as uuid } from "uuid";

export async function saveEvidenceOffline(data) {
	const realm = await getRealm();
	realm.write(() => {
		realm.create(TB_EVIDENCES, {
			id: uuid(),
			...data,
			createdAt: new Date()
		});
	});
}

export async function getAllEvidenceByFireOffline(fireId) {
	const realm = await getRealm();
	const evidences = realm.objects(TB_EVIDENCES)
		.filtered(`fireId = "${fireId}"`);

	return evidences;
}

export async function deleteEvidenceByIdOffline(id) {
	const realm = await getRealm();
	const evidence = realm.objectForPrimaryKey(TB_EVIDENCES, id);
	realm.write(() => {
		realm.delete(evidence);
	});
}
