const express = require("express");
const app = express();
const cors = require("cors");
import { getLinks, getBoulderNames, getAreas } from "./webscrape";
import { addToDbNames, getFromDb } from "./sqlStatements";
import { toTableFormBoulders, toTableFormArea } from "./toTableForm";

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", async (req, res) => {
  const answer = await req.body;
  console.log(answer)
});

app.get("/database", (req, res) => {
  getFromDb((error: Error, result) => console.log(result.rows));
  res.send("Boulder abgefragt");
});

app.get("/area/:crags", (req, res) => {
  try {
    const scrapeBoulders = async () => {
      const { crags } = req.params;
      const getArea = await getAreas(crags);
      const tableForm = toTableFormArea(getArea);

      res.json(tableForm);
    };
    scrapeBoulders();
  } catch (err) {
    console.log(err);
  }
});

app.get("/boulder/:crag", (req, res) => {
  try {
    const scrapeBoulders = async () => {
      const { crag } = req.params;
      const getArea = await getLinks(crag);
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
  console.log("Server läuft");
});
