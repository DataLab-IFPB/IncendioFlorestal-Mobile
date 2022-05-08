import Realm from 'realm';
import FireIndiceSchema from '../../schemas/database/FireIndiceSchema';

const realmDB = () => {

    function getRealm() {
        
        return Realm.open({
            schema: [FireIndiceSchema]
        });
    }

    async function saveFireIndiceOffline(data) {
        const realm = await getRealm();
        data.id = Date.now();
        realm.write(() => {
            realm.create('FireIndice', data);
        });
    }

    async function getFireIndicesOffline() {
        const realm = await getRealm();
        return new Promise((resolve) => {
            const data = realm.objects('FireIndice');
            resolve(data);
        });
    }

    async function clearFireIndicesOffline() {
        const realm = await getRealm();
        realm.write(() => {
            realm.deleteAll();
        });
    }

    return {
        saveFireIndiceOffline,
        getFireIndicesOffline,
        clearFireIndicesOffline
    };
}

export { realmDB };