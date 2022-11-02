import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRepositoryMemory
  implements ParkingLotRepository
{
  parkingLots = [
    {
      code: "shopping",
      capacity: 5,
      open_hour: 8,
      close_hour: 22,
      occupiedSpaces: 0,
    },
  ];
  parkedCar = [];

  getParkingLot(code: string): Promise<ParkingLot> {
    const parkingLotData = this.parkingLots.find(
      (parkingLot) => parkingLot.code === code
    );
    const occupiedSpaces = this.parkedCar.length;

    const parkingLot = ParkingLotAdapter.create(
      parkingLotData.code,
      parkingLotData.capacity,
      parkingLotData.open_hour,
      parkingLotData.close_hour,
      occupiedSpaces
    );
    return Promise.resolve(parkingLot);
  }

  saveParkedCar(code: string, plate: string, date: Date): void {
    this.parkedCar.push({
      code,
      plate,
      date,
    });
  }
}
