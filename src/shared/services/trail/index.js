import axios from "axios";
import { MAP_BOX_KEY } from "../../../constants";

const trail = () => {

	async function fetchDirections(initialCoordinates, endCoordinates) {
		return axios.get(
			"https://api.mapbox.com/directions/v5/mapbox/walking/" +
			`${initialCoordinates.longitude},${initialCoordinates.latitude};` +
			`${endCoordinates.longitude},${endCoordinates.latitude}` +
			"?geometries=geojson" +
			`&access_token=${MAP_BOX_KEY}`
		);
	}

	return { fetchDirections };
};

export default trail;
