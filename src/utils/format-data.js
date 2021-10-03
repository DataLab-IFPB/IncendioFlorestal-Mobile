import moment from 'moment';

export default function formatData(date) {
  if (date === null || date === undefined) {
    return ' - ';
  }
  const dateUTC = new Date(date);
  const formatter = moment(dateUTC);

  return formatter.format('DD/MM/YYYY');
}
