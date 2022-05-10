import { useDispatch } from 'react-redux';
import Realm from 'realm';
import FireIndiceSchema from '../../schemas/database/FireIndiceSchema';
import { saveFireIndiceOffline as saveFireIndiceStore } from '../../../redux/fire-indices/fire-indices-action';

const realmDB = () => {

    const dispatch = useDispatch();

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
        dispatch(saveFireIndiceStore(data));
    }

    async function getFireIndicesOffline() {
        const realm = await getRealm();
        return realm.objects('FireIndice').map((item) => ({
            latitude: item.latitude,
            longitude: item.longitude,
            acq_date: item.acq_date,
            acq_datetime: item.acq_datetime,
            active: item.active,
            daynight: item.daynight,
            WKT: item.WKT
        }))
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