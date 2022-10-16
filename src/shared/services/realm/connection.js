import Realm from "realm";

import {
	FireSchema, GPSLoggerSchema, EvidenceSchema
} from "../../schemas/database";

export const getRealm = async () => await Realm.open({
	path: "fg-app",
	schemaVersion: 2,
	schema: [ FireSchema, GPSLoggerSchema, EvidenceSchema ]
});
