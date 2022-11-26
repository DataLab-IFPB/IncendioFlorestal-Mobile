import { TB_FIRES } from "../../../constants";

export const FireSchema = {
	name: TB_FIRES,
	properties: {
		id: "string",
		latitude: "float",
		longitude: "float",
		status: "string",
		active: { type: "bool", default: true },
		userCreated: { type: "bool", default: true }
	},
	primaryKey: "id"
};
