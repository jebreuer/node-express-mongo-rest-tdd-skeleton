let mongoose = require('mongoose');

let options = {
  useNewUrlParser: true
}

let uri = "mongodb://mongo:27017/integration"

console.log('configuring mongoose with URI: ' + uri)
mongoose.connect(uri, options);
let db = mongoose.connection;
console.log("mongoose.connection.readyState: " + db.readyState);
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = { "envLoaded": "INTEGRATION" }