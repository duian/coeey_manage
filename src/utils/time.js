function initDate(date) {
  let _date;
  if (typeof date === 'string') {
    _date = new Date(date);
  } else {
    _date = date;
  }
  return _date;
}
const time = {
  ymdhms(date) {
    const _date = initDate(date);
    const year = `${_date.getFullYear()}`;
    let month = `${(_date.getMonth() + 1)}`; if (month.length === 1) { month = `0${month}`; }
    let day = `${_date.getDate()}`; if (day.length === 1) { day = `0${day}`; }
    let hour = `${_date.getHours()}`; if (hour.length === 1) { hour = `0${hour}`; }
    let minute = `${_date.getMinutes()}`; if (minute.length === 1) { minute = `0${minute}`; }
    let second = `${_date.getSeconds()}`; if (second.length === 1) { second = `0${second}`; }
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  },

  ymdhm(date) {
    const _date = initDate(date);
    const year = `${_date.getFullYear()}`;
    let month = `${(_date.getMonth() + 1)}`; if (month.length === 1) { month = `0${month}`; }
    let day = `${_date.getDate()}`; if (day.length === 1) { day = `0${day}`; }
    let hour = `${_date.getHours()}`; if (hour.length === 1) { hour = `0${hour}`; }
    let minute = `${_date.getMinutes()}`; if (minute.length === 1) { minute = `0${minute}`; }
    return `${year}-${month}-${day} ${hour}:${minute}`;
  },

  ymd(date) {
    const _date = initDate(date);
    const year = `${_date.getFullYear()}`;
    let month = `${(_date.getMonth() + 1)}`; if (month.length === 1) { month = `0${month}`; }
    let day = `${_date.getDate()}`; if (day.length === 1) { day = `0${day}`; }
    return `${year}${month}${day}`;
  },

  ymdWithDash(date) {
    const _date = initDate(date);
    const year = `${_date.getFullYear()}`;
    let month = `${(_date.getMonth() + 1)}`; if (month.length === 1) { month = `0${month}`; }
    let day = `${_date.getDate()}`; if (day.length === 1) { day = `0${day}`; }
    return `${year}-${month}-${day}`;
  },
};

export default time;
