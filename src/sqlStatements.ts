const {client} = require("./database")
let clientImp;
client.then(data => clientImp = data)

export function addToDb(boulders: string[]) {

    for(var i = 0; i < boulders.length; i++){
        clientImp.query(
            "INSERT INTO boulders (name) VALUES ($1)",
            [boulders[i]]
        );   
    }
}
export function getFromDb(callback) {

     var boulders = clientImp.query(
            "SELECT name FROM boulders",
            callback
    );   
}
