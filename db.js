const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID; // define the object id
const dbname = "crud_mongodb"; // Define our database while naming it
const url = "mongodb://127.0.0.1:27017"; //default url where the mongodb database will be located on the local machine
//const mongoOptions = {useNewUrlParser : true}; //Mongodb options

const state = {
  db: null,
}; // This defines the initial state of the db to be null

const connect = (cb) => {
  //callback
  if (state.db) cb();
  else {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, client) => {
        //MongoClient.connect(url,mongoOptions,{ useUnifiedTopology: true, useNewUrlParser: true, },(err, client)=>{
        if (err) cb(err);
        else {
          state.db = client.db(dbname);
          cb();
          if (err) return console.log(err);

          // Storing a reference to the database so you can use it later
          // db = client.db(dbname)
          // console.log(`Connected MongoDB: ${url}`)
          // console.log(`Database: ${dbname}`)
        }
      }
    );
  }
}; // Define the connection method

// MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true,}).then(() => console.log('DB Connected!')).catch(err => {
// 	state.db = client.db(dbname);
//   cb();
// });

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
}; // Get the primary key

const getDB = () => {
  return state.db;
}; // Get the database

module.exports = { getDB, connect, getPrimaryKey }; // Expose all the functions that were created
