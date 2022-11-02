import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import GetParkingLot from "../src/core/usecase/GetParkingLot";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";

describe("ParkingLot", () => {
  test("should enter parking lot", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();

    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLog = new GetParkingLot(parkingLotRepositoryMemory);
    const parkingLotBeforeEnter = await getParkingLog.execute("shopping");

    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute(
      "shopping",
      "MMM-0001",
      new Date("2021-03-01T10:00:00")
    );

    const parkingLotAfterEnter = await getParkingLog.execute("shopping");

    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
  });
});
