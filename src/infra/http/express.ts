import Express from "express";
import GetParkingLot from "../../core/usecase/GetParkingLot";
import ParkingLotRepositorySQL from "../repository/ParkingLotRepositorySQL";

const app = Express();

app.get("/parkingLots/:code", async function (req, res) {
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
  const parkingLot = await getParkingLot.execute(req.params.code);
  res.json(parkingLot);
});

app.listen(3000);
