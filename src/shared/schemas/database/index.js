import { appSchema } from "@nozbe/watermelondb";
import TrailSchema from "./TrailSchema";
import EvidenceSchema from "./EvidenceSchema";
import FireIndiceSchema from "./FireIndiceSchema";

export const schemas = appSchema({
	version: 1,
	tables: [ FireIndiceSchema, EvidenceSchema, TrailSchema ]
});
