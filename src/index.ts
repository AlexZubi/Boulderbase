const express = require("express");
const app = express();
import {getCrags, getBoulders} from "./webscrape";
import {addToDb, getFromDb} from "./sqlStatements";

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post("/", (request, response)=> {

    console.log(request.body);

    getCrags(request.query.crag, (resultCrags) => 
        getBoulders(resultCrags, (resultBoulders) =>                   
            addToDb(resultBoulders)
    )); 
    response.send("Boulder hinzugefügt");
}); 

app.get("/", (request, response)=> {

    getFromDb((error, result) =>
        console.log(result)
    );
    response.send("Boulder abgefragt");
});

app.listen(3000, ()=>{
    console.log("Server läuft");
});
