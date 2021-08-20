const express = require("express");
const app = express();
import {getCrags, getBoulders} from "./webscrape";

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/* app.post("/", (request, response)=>{
    response.send(size(Number.parseInt(request.query.Field)))
}); */

app.get("/", (request, response)=>{

    getCrags(request.query.crag);
    response.send("Bye World!")
});

app.listen(3000, ()=>{
    console.log("Server läuft");
});
