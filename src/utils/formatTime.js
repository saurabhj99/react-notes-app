const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const formatTime = (date) => {
  const dateObj = new Date(date);

  let minutes = dateObj.getMinutes();
  let hours = dateObj.getHours();

  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  let time = hours < 12 ? "am" : "pm";

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours > 12) {
    hours = hours - 12;
  }

  return `${day} ${month} ${year} ${hours}:${minutes} ${time}`;
};

export default formatTime;
