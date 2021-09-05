const express = require("express");
const app = express();
const cors = require("cors");
import { getSection, getBoulderNames, getSections } from "./webscrape";
import { addToDbMultiple, addToDbSingle, getFromDb } from "./sqlStatements";
import { toTableFormBoulders, toTableFormArea } from "./toTableForm";

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
      const getArea = await getSection(crag);
      const getBoulder = await getBoulderNames(getArea);
      const tableForm = toTableFormBoulders(getBoulder);

      res.json(tableForm);
    };
    scrapeBoulders();
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  //Starts the server
  console.log("Server läuft");
});
