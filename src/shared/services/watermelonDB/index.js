import { trailManagerDB } from "./trail";
import { fireIndiceManagerDB } from "./fireIndice";

const watermelonDB = () => {
	return {
		fireIndiceManagerDB,
		trailManagerDB
	};
};

export { watermelonDB };
