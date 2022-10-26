export default class ParkingLot {
  code: any;
  capacity: any;
  openHour: any;
  closeHour: any;

  constructor(code, capacity, openHour, closeHour) {
    this.code = code;
    this.capacity = capacity;
    this.openHour = openHour;
    this.closeHour = closeHour;
  }

  isOpen(date: Date) {
    const hour = date.getHours();

    return hour >= this.openHour && hour <= this.closeHour;
  }
}
