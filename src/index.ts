const express = require("express");
const app = express();
const cors = require("cors");
import { addToDbSingle, getFromDb } from "./userSql";
import queryDistributor, { update, webscrape } from "./queryDistributor";

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", (req, res) => {
  //Adds the clicked boulders to the so-far climbed database
  addToDbSingle(req.body);
});

app.get("/database", async (req, res) => {
  //Gets the values from the database
  let result = await getFromDb();
  res.send(result.rows);
});

app.get('/:crag', async (req, res) => {
  //Testfunction
  const { crag } = req.params;
  console.log(await webscrape(crag))
})

app.get("/boulder/:crag", async (req, res) => {
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
