import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class TrailModel extends Model {

	static table = "TB_TRAIL";

	@field("fire_indice") fire_indice;
	@field("initial_latitude") initial_latitude;
	@field("initial_longitude") initial_longitude;
	@field("end_latitude") end_latitude;
	@field("end_longitude") end_longitude;
}

export default TrailModel;
