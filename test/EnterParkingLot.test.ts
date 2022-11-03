import ParkingLotRepositorySQL from "../src/infra/repository/ParkingLotRepositorySQL";
import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import GetParkingLot from "../src/core/usecase/GetParkingLot";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";

describe("ParkingLot", () => {
  test.skip("should get parking lot", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();

    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
    const parkingLot = await getParkingLot.execute("shopping");
    expect(parkingLot.code).toBe("shopping");
  });

  test("should enter parking lot", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();

    const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL);
    const getParkingLog = new GetParkingLot(parkingLotRepositorySQL);
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

  test.skip("should be closed", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();

    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLog = new GetParkingLot(parkingLotRepositoryMemory);
    const parkingLotBeforeEnter = await getParkingLog.execute("shopping");

    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute(
      "shopping",
      "MMM-0001",
      new Date("2021-03-01T123:00:00")
    );
  });

  test.skip("should be full", async () => {
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
    await enterParkingLot.execute(
      "shopping",
      "MMM-0002",
      new Date("2021-03-01T10:00:00")
    );
    await enterParkingLot.execute(
      "shopping",
      "MMM-0003",
      new Date("2021-03-01T10:00:00")
    );
    await enterParkingLot.execute(
      "shopping",
      "MMM-0004",
      new Date("2021-03-01T10:00:00")
    );
    await enterParkingLot.execute(
      "shopping",
      "MMM-0005",
      new Date("2021-03-01T10:00:00")
    );
    await enterParkingLot.execute(
      "shopping",
      "MMM-0006",
      new Date("2021-03-01T10:00:00")
    );
  });
});
