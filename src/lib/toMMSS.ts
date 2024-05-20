export function toMMSS(secs: number|undefined) {
  if (secs) {
    let minutes = Math.floor(secs/60);
    let seconds = Math.floor(secs - minutes * 60);
    return `${minutes > 9 ? "" : "0"}${minutes}:${seconds > 9 ? "" : "0"}${seconds}`;
  }
  return "00:00";
}
