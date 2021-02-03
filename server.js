// server.js
require("dotenv/config");
const generateKey = require("random-key-generator");
const express = require("express");
const getCSV = require("get-csv");

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    if (!req.body.csv)
      return res.status(400).json({ error: "Invalid body format!" });
    const { url, select_fields: selected } = req.body.csv;
    // Validate CSV URL
    const URLPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*).csv$/i;
    if (!url || !url.match(URLPattern))
      return res.status(400).json({ error: "Please provide a valid url!" });

    // Read CSV to JS array
    const resCSV = await getCSV(url);
    // Make sure that all fields (if selected) are on the CSV
    if (selected) selected.forEach((selection) => {});
    const json = resCSV.map((element) => {
      if (selected && selected.length > 0) {
        // Select only choosen fields and return new element
        const filteredElement = {};
        selected.forEach((selection) => {
          if (!resCSV[0][selection])
            return res.status(400).json({
              error: "Some fields you selected are not on the original CSV",
              field: selection,
            });
          filteredElement[selection] = element[selection];
        });
        return filteredElement;
      }
      // If no selection of fields return original element
      return element;
    });
    res.status(200).json({
      conversion_key: generateKey(30), // Generate random identifier
      json,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
