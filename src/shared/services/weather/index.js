import axios from "axios";

import { API_WEATHER_KEY } from "../../../constants";
import { mountForecast } from "../../utils/weather";

const weather = () => {
	async function getForecast(longitude, latitude) {
		const forecast = await axios.get(
			`https://api.weatherapi.com/v1/current.json?key=${API_WEATHER_KEY}&q=${latitude},${longitude}&aqi=no`
		);

		const locale = await axios.get(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}6&lon=${longitude}`
		);

		return mountForecast({
			forecast: forecast.data,
			locale: locale.data
		});
	}

	return { getForecast };
};

export default weather;
