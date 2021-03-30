class EorzeClock {
  date: Date;
  static EORZEA_TIME_CONSTANT = 3600 / 175;
  constructor(d?: number | Date) {
    const date: Date | undefined = typeof d === "number" ? new Date(d) : d;

    this.date =
      date || new Date(new Date().getTime() * EorzeClock.EORZEA_TIME_CONSTANT);
  }

  setHours(hour: number) {
    const date = new Date(this.date)
    return new EorzeClock(date.setUTCHours(hour, 0, 0));
  }

  getHours() {
    return this.date.getUTCHours();
  }

  getMinutes() {
    return this.date.getUTCMinutes();
  }

  getEarthTime() {
    return new Date(this.date.getTime() / EorzeClock.EORZEA_TIME_CONSTANT);
  }

  static getMinuteSecondsString(date: Date) {
    const min = date.getUTCMinutes();
    const ms: string = min < 10 ? "0" + min : min.toString();
    const seconds = date.getUTCSeconds();
    const ss: string = seconds < 10 ? "0" + seconds : seconds.toString();
    return `${ms}:${ss}`;
  }
}

export default EorzeClock;
