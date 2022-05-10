import moment from 'moment';

function formatUTC(date) {

  if (date === null || date === undefined) {
    return ' - ';
  }

  const formatter = moment(date);
  return formatter.format('DD/MM/YYYY');
}

function formatISO(date) {
  const formatter = moment(date);
  return formatter.format('YYYY-MM-DD');
}  

export { formatISO, formatUTC };