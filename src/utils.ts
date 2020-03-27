let timeIncr = [[1000, "sec"], [60, "min"], [60, "hr"], [24, "day"]];

let timeModifiers = timeIncr
  .reduce((result, next) => {
    let modifier = 1;
    if (result.length) {
      modifier = result[result.length - 1][0];
    }
    result.push([modifier * next[0], next[1]]);
    return result;
  }, [])
  .reverse();

export const agoFromTimestamp = timestamp => {
  let date = new Date(timestamp);
  let now = Date.now();
  let diff = now - timestamp;

  if (diff < 1000) {
    return "just now";
  }

  if (diff > timeModifiers[0][0] * 5) {
    let rawDate = new Date(+timestamp);
    let date = rawDate
      .toISOString()
      .replace(/\-/g, "/")
      .replace(/[TZ]/g, " ")
      .replace(/\.[0-9]+/, "")
      .trim();
    let [year, month, day, hour, min, sec] = date.split(/[\/\s:]/g);
    hour = +hour - rawDate.getTimezoneOffset() / 60;
    return `${[+month, day, year].join("/")} ${[hour % 12 || 12, min, sec].join(
      ":"
    )} ${hour > 12 ? "pm" : "am"}`;
  }

  let str = timeModifiers
    .reduce((result, next) => {
      if (diff > next[0]) {
        let count = parseInt(diff / next[0]);
        result.push(`${count} ${next[1]}${count > 1 ? "s" : ""}`);
        diff = diff % next[0];
      }
      return result;
    }, [])
    .join(", ");

  return str + " ago";
};
