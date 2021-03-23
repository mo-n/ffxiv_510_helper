class EorzeClock {
  date: Date;
  static EORZEA_TIME_CONSTANT = 3600 / 175;

  constructor() {
    this.date = new Date(
      new Date().getTime() * EorzeClock.EORZEA_TIME_CONSTANT
    );
  }

  getHours() {
    return this.date.getUTCHours();
  }

  getMinutes() {
    return this.date.getUTCMinutes();
  }

  getHourMinuteString() {
    const hour = this.getHours();
    const hs: string = hour < 10 ? "0" + hour : hour.toString();
    const min = this.getMinutes();
    const ms: string = min < 10 ? "0" + min : min.toString();
    return `${hs}:${ms}`;
  }
}

export default EorzeClock;
