import express, { Request, Response } from "express";
import cors from "cors";

import { checkAndUpdateWebscrapedArea } from "./database/checkAndUpdateWebscrapedArea";
import {
  deleteUserBoulder,
  insertUserBoulder,
  retrieveUserBoulders,
} from "./database/userBoulder";
import retrieveBoulders from "./database/retrieveBoulders";
import getConnection from "./database/connectionPool";

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/boulders/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  try {
    getConnection().then((client) => {
      insertUserBoulder(id, client)
        .then(() => res.sendStatus(200))
        .then(() => client.release());
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/boulders", async (req: Request, res: Response) => {
  try {
    getConnection().then((client) =>
      retrieveUserBoulders(client)
        .then((boulderList) => res.send(boulderList))
        .then(() => client.release())
    );
  } catch (error) {
    console.error(error);
  }
});

app.get("/boulders/:section", (req: Request, res: Response) => {
  const { section } = req.params;

  try {
    getConnection().then((client) =>
      retrieveBoulders(section, client)
        .then((boulderList) => res.send(boulderList))
        .then(() => client.release())
    );
  } catch (error) {
    console.error(error);
  }
});

app.delete("/boulders/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  try {
    getConnection().then((client) =>
      deleteUserBoulder(id, client)
        .then(() => res.sendStatus(200))
        .then(() => client.release())
    );
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, async () => {
  try {
    getConnection().then((client) => {
      checkAndUpdateWebscrapedArea(client)
        .then((updated) => {
          if (updated) {
            console.log("Data updated");
          } else {
            console.log("No updates were necessary");
          }
        })
        .then(() => client.release());
    });
  } catch (error) {
    console.error(error);
  }
});
