const express = require("express");
const app = express();
const cors = require("cors");
import { getSections } from "./webscrape";
import { addToDbSingle, getFromDb } from "./userSql";
import { toTableFormArea } from "./toTableForm";
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
  addToDbSingle(req.body);
});

app.get("/database", (req, res) => {
  //Gets the values from the database
  async function getBoulders() {
    let result = await getFromDb();
    res.send(result.rows);
  }
  getBoulders();
});

app.get("/area/:crags", (req, res) => {
  //Gets all the sections of an area
  try {
    const scrapeBoulders = async () => {
      const { crags } = req.params;
      const getArea = await getSections(crags);
      const tableForm = toTableFormArea(getArea);

      res.json(tableForm);
    };
    scrapeBoulders();
  } catch (err) {
    console.log(err);
  }
});

app.get("/boulder/:crag", (req, res) => {
  //Gets all the boulders from the scraper
  try {
    const scrapeBoulders = async () => {
      const { crag } = req.params;
      const getBoulders = await queryDistributor(crag)
      return getBoulders
    };
    scrapeBoulders().then((boulders) => res.json(boulders));
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  //Starts the server
  console.log("Server läuft");
});
