export const PERMISSION_LOCATION_USE = "@BOMBEIROS/PERMISSION_LOCATION_USE";
export const USER_REGISTRATION = "@BOMBEIROS/USER_REGISTRATION";
export const USER = "@BOMBEIROS/USER";
export const DOMAIN_EMAIL = "@bombeirospb.gov";
export const RECORDER_ROUTER_INITIAL_COORDINATES = "@RECORDER_ROUTER/INITIAL_COORDINATES";
export const RECORDER_ROUTER_END_COORDINATES = "@RECORDER_ROUTER/END_COORDINATES";
export const API_WEATHER_KEY = "2e76240f6f9c4c24903191956213107";
export const MAP_BOX_KEY =
	"pk.eyJ1IjoiaXRhbG9hN3giLCJhIjoiY2txYjVxcndqMHd5aTJ1dDV0ZXBlM2kxaCJ9.P1_QYLu4AQbAX9u-V37_1Q";

export const CAM_CONFIG = {
	mediaType: "photo",
	includeBase64: true,
	maxHeight: 300,
	maxWidth: 300,
	quality: 1,
	cameraType: "back",
};

export const CAM_CONFIG_RECORD = {
	...CAM_CONFIG,
	mediaType: "video",
	videoQuality: "medium",
	durationLimit: 60000,
};

export const GALLERY_CONFIG = {
	mediaType: "mixed",
	selectionLimit: 1,
	videoQuality: "medium",
};

export const UPLOAD_TYPES = Object.freeze({
	CAM: "base64",
	RECORD: "mp4",
	GALLERY: "base64",
});

export const UPLOAD_TYPE = {
	IMAGE: "IMAGE",
	VIDEO: "VIDEO",
};

export const RESOLUTION_IMAGE_AND_VIDEO = {
	width: 300,
	height: 300,
};
