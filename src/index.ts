const express = require("express");
const app = express();
const cors = require("cors");
const Request = express.Request
import { update } from "./update";
import { addToDb, deleteFromDb, getFromDb } from "./userSql";
import queryDistributor from "./queryDistributor";
import { BoulderType } from "./boulderType";

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", (req: Request, res) => {
  //Handles the query to add the supplied boulder to the "boulders"-database
  addToDb(req.body as BoulderType)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
});

app.get("/database", async (req, res) => {
  //Handles the query to get the values from the "boulders"-database
  getFromDb().then((boulderList) => res.send(boulderList))
});

app.get("/", async (req, res) => {
  //Testfunction
});

app.get("/boulder/:crag", async (req, res) => {
  //Handles the query to get all the boulders of a supplied section from the scraper
  try {
    const { crag } = req.params;
    await queryDistributor(crag, function (result) {
      res.json(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/", (req, res) => {
  //Handles the query to delete the supplied boulder from the "boulders"-database
  deleteFromDb(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
})

app.listen(3000, async () => {
  //Starts the server and checks if updates to the database are neccessary
  update();
  console.log("Data updated. Server ready");
});
