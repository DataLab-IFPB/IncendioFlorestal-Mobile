import { tableSchema } from "@nozbe/watermelondb";

const TrailSchema = tableSchema({
	name: "TB_TRAIL",
	columns: [
		{ name: "fire_indice", type: "string" },
		{ name: "initial_latitude", type: "number" },
		{ name: "initial_longitude", type: "number" },
		{ name: "end_latitude", type: "number" },
		{ name: "end_longitude", type: "number" },
	]
});

export default TrailSchema;
