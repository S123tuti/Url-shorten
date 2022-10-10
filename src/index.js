const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./routes/route')
const redis = require("redis")
 const {promisify} = require("util")

const app = express();

app.use(bodyParser.json())

app.use('/',route)



const redisClient = redis.createClient(
  12538, //port
"redis-12538.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
  );
  redisClient.auth("4okMYxBqjrdHQokYaLMKtALtlgrrGGri", function (err) {
    if (err) throw err;
  });
  
  redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
  });
  const SET_ASYNC = promisify(redisClient.SETEX).bind(redisClient);
  const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);
  

const string = "mongodb+srv://Priyanka19:G8reXRlHUbBX65ev@plutonium01.9fxu8wj.mongodb.net/group59Database"

mongoose.connect(string, {useNewUrlParser: true})
.then(()=>console.log("mongoDB is connected")) 
.catch((err)=>console.log(err));



const port = process.env.PORT || 3000
app.listen(port,function(){
    console.log("app is running on the port"+port)
})

exports.GET_ASYNC = GET_ASYNC;
exports.SET_ASYNC = SET_ASYNC;