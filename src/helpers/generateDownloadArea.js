const RADIUS_KM = 4;
const AMOUNT_POINTS = 20;

export function getZone(latitude, longitude) {
	const radiusLatitude = 1 / 110.574 * RADIUS_KM;
	const radiusLongitude = 1 / (111.319 * Math.cos(latitude)) * RADIUS_KM;

	const dTheta = 2 * Math.PI / AMOUNT_POINTS;
	let theta = 0;

	const points = [];
	for(let i = 0; i < AMOUNT_POINTS; i++) {
		points.push([
			longitude + radiusLongitude * Math.cos(theta),
			latitude + radiusLatitude * Math.sin(theta)
		]);
		theta += dTheta;
	}

	points.push(points[0]);

	return points;
}
