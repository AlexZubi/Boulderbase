const getConnection = require("./database");

export var connection = null;
getConnection(function(err, con) {
  connection = con
})