const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// midleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Octalink Server Is Running')
})

app.listen(port, () => {
  console.log(`Octalink-server is running on port ${port}`)
})