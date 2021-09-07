export const PERMISSION_LOCATION_USE = '@BOMBEIROS/PERMISSION_LOCATION_USE';
export const DOMAIN_EMAIL = '@bombeirospb.gov';
export const CAM_CONFIG = {
  mediaType: 'photo',
  includeBase64: true,
  maxHeight: 300,
  maxWidth: 300,
  quality: 1,
  cameraType: 'back',
};

export const CAM_CONFIG_RECORD = {
  ...CAM_CONFIG,
  mediaType: 'video',
  videoQuality: 'medium',
  durationLimit: 60000,
};

export const GALLERY_CONFIG = {
  mediaType: 'mixed',
  selectionLimit: 1,
  videoQuality: 'medium',
};
export const DB_URI =
  'https://combate-incendios-dev-default-rtdb.firebaseio.com';

export const UPLOAD_TYPES = Object.freeze({
  CAM: 'CAM',
  RECORD: 'RECORD',
  GALLERY: 'GALLERY',
});
