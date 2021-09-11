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

export const UPLOAD_TYPES = Object.freeze({
  CAM: 'base64',
  RECORD: 'mp4',
  GALLERY: 'base64',
});

export const UPLOAD_TYPE = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
};
