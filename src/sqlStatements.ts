let {pool: pool} = require('./database');
import {getCrags, getBoulders} from "./webscrape";

export function addToDB(boulders: string[]) {

    for(var i = 0; i < boulders.length; i++){
        pool.query(
            "INSERT INTO boulders (name) VALUES ($1)",
            [boulders[i]]
         );   
    }
}

/* "Manuelles" Einfügen von übergebenen Werten
     const {name, grade} = request.body;        
     const newBoulder = pool.query(
        "INSERT INTO boulders (name, grade) VALUES ($1, $2)",
        [name, grade]
        ); */