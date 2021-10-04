import express, { Request, Response } from "express";
import cors from "cors";
import { update } from "./database/update";
import { addToDb, deleteFromDb, getFromDb } from "./database/userSql";
import distributeQuery from "./database/queryHandler";
import { BoulderType } from "./models/boulderType";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", (req: Request, res: Response) => {
  //Handles the query to add the supplied boulder to the "boulders"-database
  addToDb(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
});

app.get("/database", async (req: Request, res: Response) => {
  //Handles the query to get the values from the "boulders"-database
  getFromDb().then((boulderList) => res.send(boulderList));
});

app.get("/boulder/:crag", async (req: Request, res: Response) => {
  //Handles the query to get all the boulders of a supplied section from the scraper
  try {
    const { crag } = req.params;
    await distributeQuery(crag, function (result: BoulderType[]): void {
      res.json(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/", (req: Request, res: Response) => {
  //Handles the query to delete the supplied boulder from the "boulders"-database
  deleteFromDb(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
});

app.listen(3000, async () => {
  //Starts the server and checks if updates to the database are neccessary
  update().then(() => console.log("Data updated. Server ready"));
});
