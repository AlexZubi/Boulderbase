const express = require("express");
const app = express();
const cors = require("cors");
import { getCrags, getBoulderNames } from "./webscrape";
import { addToDbNames, getFromDb } from "./sqlStatements";
import toTableForm from "./toTableForm";

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", (req, res) => {
  getCrags(req.query.crag).then(getBoulderNames).then(addToDbNames);

  res.send("Boulder abgefragt");
});

app.get("/database", (req, res) => {
  getFromDb((error: Error, result) => console.log(result.rows));
  res.send("Boulder abgefragt");
});

app.get("/", (req, res) => {
  try {
    const scrapeBoulders = async () => {
      const getArea = await getCrags(req.query.crag);
      const getBoulder = await getBoulderNames(getArea);
      const tableForm = toTableForm(getBoulder);

      res.send(tableForm);
    };
    scrapeBoulders();
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server läuft");
});
