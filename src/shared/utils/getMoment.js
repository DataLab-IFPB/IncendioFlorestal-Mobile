import moment from 'moment';

export default function getMoment() {
  const now = new Date();
  const momentInstance = moment(now);
  const currentHour = momentInstance.format('HH');
  let momentType = '';

  if (currentHour >= 3 && currentHour < 12) {
    momentType = 'D';
  } else if (currentHour >= 20) {
    momentType = 'N';
  }

  return momentType;
}
