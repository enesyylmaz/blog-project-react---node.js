const express = require("express");
const mongoose = require("mongoose");
const database = require("./database");
const dbFunctions = require("./dbFunctions");
const adminFunctions = require("./adminFunctions");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const path = require("path");

require("dotenv").config();

// Middleware
const corsOptions = {
  origin: "https://blogprojecttest.onrender.com", // Frontend URI (ReactJS)
};
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use(express.json());
app.use(cors(corsOptions));

// Routes

app.get("/api/data", async (req, res) => {
  const offset = parseInt(req.query.offset) || 0; // Parse offset from query parameter
  const limit = 3; // Set the number of documents to fetch
  try {
    const docs = await dbFunctions.getAllDocs(offset, limit);
    res.json(docs);
  } catch (err) {
    console.error("# Get Error", err);
    res.status(500).send({ error: err.name + ", " + err.message });
  }
});

app.get("/api/data/:id", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid _id format." });
  }

  try {
    const doc = await dbFunctions.getDocById(id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found." });
    }
    res.json(doc);
  } catch (err) {
    console.error("# Get Single Data Error", err);
    res.status(500).json({ error: err.name + ", " + err.message });
  }
});

app.post("/api/adddata", async (req, res) => {
  let data = req.body;

  try {
    data = await dbFunctions.addDoc(data);
    res.json(data);
  } catch (err) {
    console.error("# Post Error", err);
    res.status(500).send({ error: err.name + ", " + err.message });
  }
});

app.delete("/api/deletedata/:id", async (req, res) => {
  const id = req.params.id;
  let respObj = {};

  if (id && ObjectId.isValid(id)) {
    try {
      respObj = await dbFunctions.deleteDoc(id);
    } catch (err) {
      console.error("# Delete Error", err);
      res.status(500).send({ error: err.name + ", " + err.message });
      return;
    }
  } else {
    respObj = { message: "Data not deleted; the id to delete is not valid!" };
  }

  res.json(respObj);
});

app.put("/api/updatedata/:id", async (req, res) => {
  const id = req.params.id;
  const updatedValues = req.body;

  if (id && ObjectId.isValid(id)) {
    try {
      await dbFunctions.updateDoc(id, updatedValues);
      res.json({ message: "Lecture information updated successfully." });
    } catch (err) {
      console.error("# Update Error", err);
      res.status(500).send({ error: err.name + ", " + err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid lecture." });
  }
});

app.get("/api/admin", async (req, res) => {
  try {
    const docs = await adminFunctions.getAllDocs();
    res.json(docs);
  } catch (err) {
    console.error("# Get Error", err);
    res.status(500).send({ error: err.name + ", " + err.message });
  }
});

app.get("/api/admin/:id", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid _id format." });
  }

  try {
    const doc = await adminFunctions.getDocById(id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found." });
    }
    res.json(doc);
  } catch (err) {
    console.error("# Get Single Data Error", err);
    res.status(500).json({ error: err.name + ", " + err.message });
  }
});

app.post("/api/addadmin", async (req, res) => {
  let data = req.body;

  try {
    data = await adminFunctions.addDoc(data);
    res.json(data);
  } catch (err) {
    console.error("# Post Error", err);
    res.status(500).send({ error: err.name + ", " + err.message });
  }
});

app.delete("/api/deleteadmin/:id", async (req, res) => {
  const id = req.params.id;
  let respObj = {};

  if (id && ObjectId.isValid(id)) {
    try {
      respObj = await adminFunctions.deleteDoc(id);
    } catch (err) {
      console.error("# Delete Error", err);
      res.status(500).send({ error: err.name + ", " + err.message });
      return;
    }
  } else {
    respObj = { message: "Data not deleted; the id to delete is not valid!" };
  }

  res.json(respObj);
});

app.put("/api/updateadmin/:id", async (req, res) => {
  const id = req.params.id;
  const updatedValues = req.body;

  if (id && ObjectId.isValid(id)) {
    try {
      await adminFunctions.updateDoc(id, updatedValues);
      res.json({ message: "Lecture information updated successfully." });
    } catch (err) {
      console.error("# Update Error", err);
      res.status(500).send({ error: err.name + ", " + err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid lecture." });
  }
});

let server;
let conn;

(async () => {
  try {
    conn = await database();
    await dbFunctions.getDb(conn);
    await adminFunctions.getDb(conn);
    const PORT = process.env.PORT;
    server = app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("# Error:", err);
    console.error("# Exiting the application.");
    await closing();
    process.exit(1);
  }
})();

async function closing() {
  console.log("# Closing resources...");
  if (conn) {
    await conn.close();
    console.log("# Database connection closed.");
  }
  if (server) {
    server.close(() => console.log("# Web server stopped."));
  }
}
