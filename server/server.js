const { Pool, Client } = require('pg')
var express = require('express')
var app = express()
const cors = require("cors")
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}))
app.use(cors())
var l;
var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : '123456',
    database : 'postgres'
  }

});

db.select('').from('school').then(data=>{l=data})
app.get('/', function (req, res) { 
  db.select('').from('school').then(data=>{l=data})
  res.send(l)

})
app.post("/",function(req,res){
  console.log(req.body);
  db('school').insert({
  	name:req.body.name
  });
  
  res.send("document added")

})
 
app.put("/",function(req,res){
  console.log(req.body)
  var result
  db('school').where({
  	name: req.body.name
  }).then(data=>{
  	if(data==""){
  		res.send("not Found")
  	}
  	else{
  	res.send(data)	
  	}
  	
  })
})


 
app.listen(3005)

