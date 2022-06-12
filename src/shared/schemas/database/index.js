import { appSchema } from "@nozbe/watermelondb";
import FireIndiceSchema from "./FireIndiceSchema";
import EvidenceSchema from "./EvidenceSchema";

export const schemas = appSchema({
	version: 1,
	tables: [ FireIndiceSchema, EvidenceSchema ]
});
