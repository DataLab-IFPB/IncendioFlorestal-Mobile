import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class FireIndiceModel extends Model {

	static table = "TB_FIRES_INDICES";

	@field("status") status;
	@field("active") active;
	@field("daynight") daynight;
	@field("latitude") latitude;
	@field("longitude") longitude;
	@field("userCreated") userCreated;
}

export default FireIndiceModel;
