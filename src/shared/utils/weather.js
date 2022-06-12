export const mountForecast = (data) => {

	const { current } = data;
	const { location } = data;
	const { temp_c, wind_kph, wind_degree, humidity, precip_in } = current;

	return {
		temp_c,
		wind_kph,
		wind_degree,
		humidity,
		precip_in,
		locale: location.name
	};
};
