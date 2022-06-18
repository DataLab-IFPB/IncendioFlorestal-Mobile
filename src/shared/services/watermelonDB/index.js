import { where } from "@nozbe/watermelondb/QueryDescription";
import { useDispatch } from "react-redux";
import { firesIndicesActions } from "../../../store/actions";
import { formatDatetime } from "../../utils/formatDate";
import { database } from "./connection";

const watermelonDB = () => {

	const TABLE_FIRES_INDICES = "TB_FIRES_INDICES";
	const TABLE_EVIDENCES = "TB_EVIDENCES";

	const dispatch = useDispatch();

	const { storeFireIndice } = firesIndicesActions;

	async function saveFireIndiceOffline(data) {

		const aux = data.latitude;
		data.latitude = data.longitude;
		data.longitude = aux;

		await database.write(async () => {
			const response = await database.get(TABLE_FIRES_INDICES).create((fireIndice) => {
				fireIndice.latitude = data.latitude;
				fireIndice.longitude = data.longitude;
				fireIndice.active = data.active;
				fireIndice.daynight = data.daynight;
				fireIndice.userCreated = data.userCreated;
				fireIndice.status = JSON.stringify(data.status);
			});

			data.id = response.id;
		});

		dispatch(storeFireIndice(data));
	}

	async function saveEvicendeOffline(data) {
		await database.write(async () => {
			await database.get(TABLE_EVIDENCES).create((evidence) => {
				evidence.path = data.path;
				evidence.fileType = data.media;
				evidence.fireIndice = data.fireIndice_id;
				evidence.createdAt = formatDatetime(new Date());
			});
		});
	}

	async function fetchFiresIndicesOffline() {
		const firesIndicesCollection = database.get(TABLE_FIRES_INDICES);
		const firesIndices = await firesIndicesCollection.query().fetch();
		return firesIndices;
	}

	async function fetchEvidencesOffline(fireIndiceId) {
		const evidencesCollection = database.get(TABLE_EVIDENCES);
		const evidences = await evidencesCollection.query().fetch();

		return evidences.filter((item) => {
			if( item.fireIndice === fireIndiceId ) {
				return item;
			}
		});
	}

	async function removeEvidenceOffline(id) {
		return new Promise((resolve) => {
			database.write(async () => {
				const evidencesCollection = database.get(TABLE_EVIDENCES);
				await evidencesCollection.query(where("id", id)).markAllAsDeleted();
			}).finally(() => {
				resolve();
			});
		});
	}

	async function clearFireIndicesOffline() {
		await database.write(async () => {
			const firesIndicesCollection = database.get(TABLE_FIRES_INDICES);
			const evidencesCollection = database.get(TABLE_EVIDENCES);
			await firesIndicesCollection.query().markAllAsDeleted();
			await evidencesCollection.query().markAllAsDeleted();
		});
	}

	async function updateStatusOffline(id, newStatus) {
		return new Promise((resolve) => {
			database.write(async () => {
				const fireIndice = await database.get(TABLE_FIRES_INDICES).find(id);
				await fireIndice.update(() => {
					fireIndice.status = newStatus;
				});
			}).finally(() => {
				resolve();
			});
		});
	}

	return {
		saveFireIndiceOffline,
		saveEvicendeOffline,
		fetchFiresIndicesOffline,
		fetchEvidencesOffline,
		clearFireIndicesOffline,
		removeEvidenceOffline,
		updateStatusOffline
	};
};

export { watermelonDB };
