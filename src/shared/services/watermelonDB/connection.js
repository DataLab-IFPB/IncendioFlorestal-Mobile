import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Database } from "@nozbe/watermelondb";
import { schemas } from "../../schemas/database";
import { FireIndiceModel, EvidenceModel, TrailModel } from "../../model";

const adapter = new SQLiteAdapter({
	schema: schemas
});

const database = new Database({
	adapter,
	modelClasses: [FireIndiceModel, EvidenceModel, TrailModel]
});

export { database };
