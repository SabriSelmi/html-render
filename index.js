import express from "express";
import bodyParser from "body-parser";
import { scrape } from "./functions.js";
const app = express();
const port = process.env.PORT || 3000;

// Use the body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Define a GET route
app.post("/scrape", async (req, res) => {
  const { url } = req.body;
  // const result = await scrape(url);
  const result = "hello world"
  res.send(result)
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
