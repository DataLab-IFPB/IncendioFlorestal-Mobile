export const PERMISSION_LOCATION_USE = '@BOMBEIROS/PERMISSION_LOCATION_USE';
export const DOMAIN_EMAIL = '@bombeiros.pb.gov.br';
export const CAM_CONFIG = {
  mediaType: 'photo',
  quality: 1,
  saveToPhotos: true,
  cameraType: 'back',
  // includeBase64: true,
};

export const CAM_CONFIG_RECORD = {
  ...CAM_CONFIG,
  mediaType: 'video',
  videoQuality: 'medium',
  durationLimit: 60000,
};
