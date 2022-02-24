const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({path:path.join('..','..','.env')});
//const connStr = process.env.NODE_ENV === 'production'?process.env.DB_CONN_STR_PROD:process.env.DB_CONN_STR_LOCAL
const connStr = 'mongodb://mongo:27017/EgcaVoteDB'
//myapp-node-server
mongoose.connect(connStr,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})
.then(()=>{
    console.log('connected to EgcaVoteDB successfully')
})
.catch(e=>`connection failed with error: ${e.message}`)   