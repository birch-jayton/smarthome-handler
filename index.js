require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
// parse various different custom JSON types as JSON
app.use(bodyParser.json())

app.post('/motion-detected', (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Smarthome app listening at http://localhost:${port}`)
})

