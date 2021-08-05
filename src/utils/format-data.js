import moment from 'moment';

export default function formatData(date) {
  const dateUTC = new Date(date);
  const formatter = moment(dateUTC);

  return formatter.format('DD/MM/YYYY');
}
