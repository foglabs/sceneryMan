var express = require('express')
var app = express()
var cors = require('cors')
// var bodyParser = require('body-parser')

// security headers
// var helmet = require('helmet')
// app.use(helmet())

app.use(cors())
app.use(express.static('app'))
// app.use(bodyParser.json())
const path = require('path')

// main site
app.get('/', function(req, res, next){
  res.header('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, 'app', 'index.html'))
})

app.listen(4000)