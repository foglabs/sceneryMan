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

app.get('/:filename', function(req, res, next){
  res.header('Content-Type', 'text/js')
  res.sendFile(path.join(__dirname, 'app', req.params.filename.replace(/^.*[\\\/]/, '')))
})

app.listen(5000)