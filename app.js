const express = require("express"); // An instance of express
const bodyParser = require("body-parser"); // An instance of bodyParser
const app = express(); // An instance of our express application
app.use(bodyParser.json()); // Call the body-parser module on the app & pass the json function to it
const path = require("path");

const db = require("./db"); // Calling the database
const collection = "todo";

/** READ **/
app.get("/", (req, res) => {
  //routing the application using the GET function based on a client's request to a static html page
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getTodos", (req, res) => {
  // routing based on the 'getTodos' path while calling on the database
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((err, documents) => {
      if (err) console.log(err);
      else {
        console.log(documents);
        res.json(documents);
      }
    });
});

/** UPDATE : Code the route for the GET the function => (2)**/
app.put("/:id", (req, res) => {
  const todoID = req.params.id; // Get the id
  const userInput = req.body; // Get the user's input

  // Connecting to our database
  db.getDB()
    .collection(collection)
    .findOneAndUpdate(
      { _id: db.getPrimaryKey(todoID) },
      { $set: { todo: userInput.todo } },
      { returnOriginal: false },
      (err, result) => {
        if (err) console.log(err);
        // print out on the console
        else res.json(result); //  send the information back to the user in json
      }
    );
});

/** Code the route for the PUT function =>(4)**/
app.post("/", (req, res) => {
  const userInput = req.body; // Get the user input

  //Connect to the database
  db.getDB()
    .collection(collection)
    .insertOne(userInput, (err, result) => {
      if (err) console.log(err);
      else res.json({ result: result, document: result.ops[0] });
    });
});

/** Code the route for the DELETE function =>(5) **/
app.delete("/:id", (req, res) => {
  const todoID = req.params.id;

  //Connect to the database
  db.getDB()
    .collection(collection)
    .findOneAndDelete({ _id: db.getPrimaryKey(todoID) }, (err, result) => {
      if (err) console.log(err);
      else res.json(result);
    });
});

db.connect((err) => {
  if (err) {
    console.log("unable to connect to database");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log("connected to database, app listening on port 3000");
    });
  }
}); // Connect to the database
