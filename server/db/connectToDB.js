const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/EgcaVoteDB',{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})
.then(()=>{
    console.log('connected to EgcaVoteDB successfully')
})
.catch(e=>`connection failed with error: ${e.message}`) 