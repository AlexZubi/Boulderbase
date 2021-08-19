import {getSite, getTables} from "./webscrape";

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post("/", (request, response)=>{
    //response.send(size(Number.parseInt(request.query.Field)))
});

app.get("/", (request, response)=>{

    console.log(getTables(getSite(request.query.crag)));
    response.send("done")

    //response.send("Bye World!")
});

app.listen(3000, ()=>{
    console.log("Server läuft");
});
