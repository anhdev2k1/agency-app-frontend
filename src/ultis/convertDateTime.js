import moment from "moment";
const convertDateTime = (datetime) => {
  const momentUtc = moment.utc(datetime);
  const vietnamDate = momentUtc.utcOffset(420).format("DD/MM/YYYY HH:mm:ss");
  return vietnamDate
};
export default convertDateTime