const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.set({ "Allow-access-Allow-Origin": "*" });
  return res.redirect("index.html");
});

app.post("/formFillUp", (req, res) => {
  const name = req.body.name;
  const reason = req.body.reason;
  const email = req.body.email;
  const phone = req.body.phone;
  const city = req.body.city;
  const state = req.body.state;
  const addressline = req.body.addressline;

  const data = {
    name,
    reason,
    email,
    phone,
    city,
    state,
    addressline,
  };
  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Data inserted successfully");
  });
  return res.redirect("formSubmitted.html");
});

app.listen(port, () => {
  console.log("The server is listening at :", port);
});
