import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class EvidenceModel extends Model {

	static table = "TB_EVIDENCES";

	@field("fireIndice") fireIndice;
	@field("path") path;
	@field("fileType") fileType;
	@field("createdAt") createdAt;
}

export default EvidenceModel;
