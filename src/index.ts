const express = require("express");
const app = express();
let {pool: pool} = require('./database');
import {getCrags, getBoulders} from "./webscrape";

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

 app.post("/", (request, response)=>{
     const {name, grade} = request.body;
     const newBoulder = pool.query(
        "INSERT INTO boulders (name, grade) VALUES ($1, $2) RETURNING *",
        [name, grade]
     );

    response.json(newBoulder)
}); 

app.get("/", (request, response)=>{

    //getCrags(request.query.crag);



    response.send("Bye World!")
});

app.listen(3000, ()=>{
    console.log("Server läuft");
});
