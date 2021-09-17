const express = require("express");
const app = express();
const cors = require("cors");
import { update } from "./update";
import { addToDbSingle, getFromDb } from "./userSql";
import queryDistributor from "./queryDistributor";

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", (req, res) => {
  //Adds the clicked boulders to the so-far climbed database
  addToDbSingle(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err.message));
});

app.get("/database", async (req, res) => {
  //Gets the values from the database
  await getFromDb(function (data) {
    res.send(data.rows);
  });
});

app.get("/", async (req, res) => {
  //Testfunction
});

app.get("/boulder/:crag", async (req, res) => {
  //Gets all the boulders from the scraper
  try {
    const { crag } = req.params;
    await queryDistributor(crag, function (result) {
      res.json(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, async () => {
  //Starts the server and checks if updates to the database are neccessary
  update();
  console.log("Data updated. Server ready");
});
