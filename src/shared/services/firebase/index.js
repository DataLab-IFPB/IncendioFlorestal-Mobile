import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import { formatDatetime, formatISO } from "../../utils/formatDate";

const firebase = () => {

	function getUserData(registration) {
		return new Promise((resolve) => {
			database()
				.ref("/users")
				.orderByChild("registration")
				.equalTo(registration)
				.once("value")
				.then((value) => {
					resolve(value.val());
				});
		});
	}

	function updateUserUid(uid, user) {
		return new Promise((resolve) => {
			const userRef = database()
				.ref(`/users/${user.ref}`)
				.update({
					registration: user.registration,
					isAdmin: user.isAdmin,
					email: user.email,
					deletedAt: user.deletedAt,
					birthDate: user.birthDate,
					firstLogin: false,
					uid,
				});
			resolve(userRef);
		});
	}

	function updateStatusFireIndice(uid, status) {
		return new Promise((resolve) => {
			const ref = database()
				.ref(`/fires/${uid}`)
				.update({
					status,
					active: status.finished_at ? false : true
				});
			resolve(ref);
		});
	}

	function mountUser(userData) {
		const ref = Object.keys(userData)[0];
		const data = Object.values(userData)[0];

		return {
			...data,
			ref,
		};
	}

	async function authenticateUser(registration, password) {

		const data = await getUserData(registration);

		if (data) {

			const user = mountUser(data);

			// Verificar primeiro acesso
			if (user.birthDate === password && user.firstLogin) {
				return { user, newUser: true };
			} else {
				return auth()
					.signInWithEmailAndPassword(user.email, password)
					.then(() => {
						return { user };
					}).catch(() => {
						return new Error("Credenciais Inválidas!");
					});
			}
		} else {
			return new Error("Usuário não cadastrado!");
		}
	}

	/**
	 * @param data -> coordenadas iniciais e finais
	 */
	async function registerNewTrail(fireIndice, user, data) {
		return new Promise((resolve, reject) => {
			const newReference = database().ref("/trails").push();

			newReference.set({
				...data,
				fire_indice: fireIndice,
				user
			}).then(() => {
				resolve("Trilha salva com sucesso");
			}).catch(() => {
				reject("Erro ao salvar Trilha");
			});
		});
	}

	async function registerNewUser(password, user) {
		return auth()
			.createUserWithEmailAndPassword(user.email, password)
			.then((data) => {
				updateUserUid(data.user.uid, user);
				return { success: true };
			})
			.catch(() => {
				return new Error("Não foi possível se registrar.");
			});
	}

	async function registerNewFireIndice(fireIndice) {

		const newReference = database().ref("/fires").push();

		if (typeof fireIndice.status === "string") {
			fireIndice.status = JSON.parse(fireIndice.status);
		}

		return new Promise((resolve, eject) => {
			newReference
				.set(fireIndice)
				.then(() => resolve(newReference.key))
				.catch(() => eject());
		});
	}

	/**
    * Cada evidência será salva no diretório referenciando o índice de incêndio,
    * e cada índice, conterá um ou vários diretórios referenciando o usuário que
    * registrou a evidência, e a evidẽncia será salva de acordo com o tipo da midia.
    */
	function registerNewEvidence(
		file,
		type,
		userRegistration,
		uidFireIndice
	) {

		const fileSplit = file.split("/");
		const nameFile = fileSplit[fileSplit.length - 1];
		const newReference = database().ref("/evidences").push();

		return new Promise((resolve, reject) => {
			const task = storage()
				.ref("evidences")
				.child(`${nameFile}`)
				.putFile(file);

			newReference.set({
				fireIndice: uidFireIndice,
				user: userRegistration,
				fileType: type,
				file: nameFile,
				createdAt: formatDatetime(new Date())
			});

			task.then(() => {
				resolve("Evidências salvas com sucesso");
			}).catch(() => {
				reject("Error ao salvar evidências");
			});
		});
	}

	/**
	 * Verificar a autenticação automática do usuário
	*/
	async function checkAuthState() {
		return new Promise((resolve, reject) => {
			auth().onAuthStateChanged((user) => {
				if (user)
					resolve(user);
				else
					reject(new Error());
			});
		});
	}

	async function getFiresIndices() {

		// Filtrar dados apertir do dia anterior
		const dateFilter = new Date();
		dateFilter.setDate(dateFilter.getDate() - 1);

		return new Promise((resolve) => {
			database().ref("/fires")
				.orderByChild("status/registered_at")
				.startAt(`${formatISO(dateFilter)}`)
				.once("value")
				.then((value) => {
					resolve(value.val());
				});
		});
	}

	async function getMedia(name) {
		return new Promise((resolve) => {
			storage().ref(`/evidences/${name}`)
				.getDownloadURL().then((media) => {
					resolve(media);
				});
		});
	}

	async function getTrails(fireIndice) {
		return new Promise((resolve) => {
			database().ref("/trails")
				.orderByChild("fire_indice")
				.equalTo(fireIndice)
				.once("value")
				.then((value) => {
					resolve(value.val());
				});
		});
	}

	async function removeTrail(uid) {
		await database().ref(`/trails/${uid}`).remove();
	}

	async function getEvidences(fireIndice) {
		return new Promise((resolve) => {
			database().ref("/evidences")
				.orderByChild("fireIndice")
				.equalTo(fireIndice)
				.once("value")
				.then((value) => {
					resolve(value.val());
				});
		});
	}

	async function removeEvidence(uid) {
		return new Promise((resolve) => {
			const ref = database().ref(`/evidences/${uid}`);
			ref.once("value")
				.then(async (value) => {
					const file = value.val().file;
					await storage().ref(`/evidences/${file}`).delete();
					ref.remove();
					resolve();
				});
		});
	}

	return {
		authenticateUser,
		registerNewUser,
		getFiresIndices,
		checkAuthState,
		registerNewEvidence,
		registerNewFireIndice,
		getUserData,
		getEvidences,
		updateStatusFireIndice,
		registerNewTrail,
		getTrails,
		getMedia,
		removeTrail,
		removeEvidence
	};
};

export default firebase;
