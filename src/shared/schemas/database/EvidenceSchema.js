import { TB_EVIDENCES } from "../../../constants";

export const EvidenceSchema = {
	name: TB_EVIDENCES,
	properties: {
		id: "string",
		fireId: "string",
		path: "string",
		fileType: "string",
		createdAt: "date"
	},
	primaryKey: "id"
};
