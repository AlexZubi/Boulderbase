let {pool: pool} = require('./database');

export function addToDB(boulders: string[]) {

    for(var i = 0; i < boulders.length; i++){
        pool.query(
            "INSERT INTO boulders (name) VALUES ($1)",
            [boulders[i]]
         );   
    }
}