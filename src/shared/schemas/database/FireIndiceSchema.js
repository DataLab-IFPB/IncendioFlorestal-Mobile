import { tableSchema } from "@nozbe/watermelondb";

const FireIndiceSchema = tableSchema({
	name: "TB_FIRES_INDICES",
	columns: [
		{name: "status", type: "string"},
		{name: "active", type: "boolean"},
		{name: "latitude", type: "number"},
		{name: "daynight", type: "string"},
		{name: "longitude", type: "number"},
		{name: "userCreated", type: "boolean"}
	]
});

export default FireIndiceSchema;
