import { tableSchema } from "@nozbe/watermelondb";

const EvidenceSchema = tableSchema({
	name: "TB_EVIDENCES",
	columns: [
		{ name: "fireIndice_id", type: "string", isIndexed: true },
		{ name: "path", type: "string" },
		{ name: "media", type: "string" }
	]
});

export default EvidenceSchema;
