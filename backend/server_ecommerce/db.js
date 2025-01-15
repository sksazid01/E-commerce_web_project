const mongoose =require('mongoose');

var mongoURL = "mongodb+srv://sk:7exUosYSc2aIPm4F@sksajid.net4uf4.mongodb.net/?retryWrites=true&w=majority&appName=sksajid";
mongoose.connect( mongoURL,{useUnifiedTopology:true, useNewUrlParser:true});

var db=mongoose.connection;


db.on('connected', ()=>{ console.log("Connection established ");})
db.on('error', ()=>{console.log("FAILED")})

module.exports = mongoose