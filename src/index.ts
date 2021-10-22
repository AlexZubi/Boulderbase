import express, {Request, Response} from "express";
import cors from "cors";
import {checkAndUpdateWebscrapedArea} from "./database/checkAndUpdateWebscrapedArea";
import {deleteUserBoulder, insertUserBoulder, retrieveUserBoulders} from "./database/userBoulder";
import retrieveBoulders from "./database/retrieveBoulders";
import getConnection from "./database/connectionPool";

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.post("/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  getConnection().then((client) => {
    insertUserBoulder(id, client)
      .then(() => res.sendStatus(200))
      .then(() => client.release());
  });
});

app.get("/database", async (req: Request, res: Response) => {
  getConnection().then((client) =>
    retrieveUserBoulders(client)
      .then((boulderList) => res.send(boulderList))
      .then(() => client.release()),
  );
});

app.get("/boulder/:section", (req: Request, res: Response) => {
  const {section} = req.params;

  retrieveBoulders(section).then((boulderList) => res.send(boulderList));
});

app.delete("/boulders/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  getConnection().then((client) =>
    deleteUserBoulder(id, client)
      .then(() => res.sendStatus(200))
      .then(() => client.release()),
  );
});

app.listen(3000, async () => {
  checkAndUpdateWebscrapedArea().then((updated) => {
    if (!updated) {
      console.log("No updates were necessary");
    } else {
      console.log("Data updated");
    }
  });
});
