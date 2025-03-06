const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch').default;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/get-questions', async (req, res) => {
  // test run to pull just two questions
  const apiUrl = `https://opentdb.com/api.php?amount=2`;
  console.log(apiUrl);
  const response = await fetch(apiUrl);
  const data = await response.json();
  res.json(data.results);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});