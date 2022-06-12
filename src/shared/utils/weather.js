export const mountForecast = (data) => {

	const { current } = data.forecast;
	const { address } = data.locale;
	const { temp_c, wind_kph, wind_degree, humidity, precip_in } = current;

	return {
		temp_c,
		wind_kph,
		wind_degree,
		humidity,
		precip_in,
		locale: address.city ? address.city : address.village
	};
};
