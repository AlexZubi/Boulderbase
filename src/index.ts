const express = require("express");
const app = express();
//let {pool: pool} = require('./database');
import {getCrags, getBoulders} from "./webscrape";
import {addToDB} from "./sqlStatements";

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

 app.post("/", (request, response)=> {

    getCrags(request.query.crag, (resultCrags) => 
    getBoulders(resultCrags, (resultBoulders) =>                   
    addToDB(resultBoulders)
    )); 
    response.send("Boulder hinzugefügt!");
}); 

app.get("/", (request, response)=> {

    getCrags(request.query.crag, (resultCrags) =>
        getBoulders(resultCrags, (resultBoulders) =>
        console.log(resultBoulders)
        )
    );
    response.send("Bye World!")
});

app.listen(3000, ()=>{
    console.log("Server läuft");
});
