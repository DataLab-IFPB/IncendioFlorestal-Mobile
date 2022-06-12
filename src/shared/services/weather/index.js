import axios from "axios";
import { API_WEATHER_KEY } from "../../../constants";
import { mountForecast } from "../../utils/weather";

const weather = () => {
	async function getForecast(longitude, latitude) {
		const response = await axios.get(
			`https://api.weatherapi.com/v1/current.json?key=${API_WEATHER_KEY}&q=${latitude},${longitude}&aqi=no`
		);
		return mountForecast(response.data);
	}

	return { getForecast };
};

export { weather };
