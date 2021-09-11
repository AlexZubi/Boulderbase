const express = require("express");
const app = express();
const cors = require("cors");
import { addToDbSingle, getFromDb } from "./userSql";
import queryDistributor, { webscrape } from "./queryDistributor";
import { update } from "./update";

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", (req: any, res: any) => {
  //Adds the clicked boulders to the so-far climbed database
  addToDbSingle(req.body);
});

app.get("/database", async (req: any, res: any) => {
  //Gets the values from the database
  let result = await getFromDb();
  res.send(result.rows);
});

app.get("/:crag", async (req: any, res: any) => {
  //Testfunction
  const { crag } = req.params;
  console.log(await webscrape(crag));
});

app.get("/boulder/:crag", async (req: any, res: any) => {
  //Gets all the boulders from the scraper
  try {
    const { crag } = req.params;
    const getBoulders = await queryDistributor(crag);
    return res.json(getBoulders);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, async () => {
  //Starts the server and checks if updates to the database are neccessary
  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
  await delay(100).then(update);
  console.log("Data updated. Server ready");
});
