let {pool: pool} = require('./database');

export function addToDb(boulders: string[]) {

    for(var i = 0; i < boulders.length; i++){
        pool.query(
            "INSERT INTO boulders (name) VALUES ($1)",
            [boulders[i]]
        );   
    }
}

export async function getFromDb(callback) {

    var boulders = await pool.query(
            "SELECT name FROM boulders"
    );   
    callback(boulders);
}
