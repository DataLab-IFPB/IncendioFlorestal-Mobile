import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class EvidenceModel extends Model {

	static table = "TB_EVIDENCES";

	@field("fireIndice_id") fireIndice_id;
	@field("path") path;
	@field("media") media;
}

export default EvidenceModel;
