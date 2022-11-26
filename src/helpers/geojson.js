export const Polygon = {
	type: "FeatureCollection",
	features: [{
		type: "Feature",
		properties: {},
		geometry: {
			type: "Polygon",
			coordinates: []
		}
	}]
};

export const LineString = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			properties: {},
			geometry: {
				type: "LineString",
				coordinates: []
			}
		}
	]
};
