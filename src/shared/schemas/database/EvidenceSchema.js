import { tableSchema } from "@nozbe/watermelondb";

const EvidenceSchema = tableSchema({
	name: "TB_EVIDENCES",
	columns: [
		{ name: "fireIndice", type: "string", isIndexed: true },
		{ name: "path", type: "string" },
		{ name: "fileType", type: "string" },
		{ name: "createdAt", type: "string" }
	]
});

export default EvidenceSchema;
