/* eslint linebreak-style: ["error", "windows"] */

require('dotenv').config();
const express = require('express');

const port = process.env.UI_SERVER_PORT || 8000;
const app = express();

app.use(express.static('public'));

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };
app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.listen(port, () => {
  console.log(`UI server started on port ${port}`);
});
