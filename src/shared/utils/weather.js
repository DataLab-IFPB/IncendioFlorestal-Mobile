export const mountForecast = (data) => {

	const { current } = data.forecast;
	const { address } = data.locale;
	const { temp_c, wind_kph, wind_degree, humidity, precip_in } = current;

	let locale = "";

	if( address.city ) {
		locale = address.city;
	} else if( address.village ) {
		locale = address.village;
	} else if( address.city_district ) {
		locale = address.city_district;
	}

	return {
		temp_c,
		wind_kph,
		wind_degree,
		humidity,
		precip_in,
		locale
	};
};
