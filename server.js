const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3001

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'client','build')))
    app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})
}
else{
    app.use(express.static(path.join(__dirname,'client','public')))
    app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','public','index.html'))
})
}

app.listen(port,()=>{ 
    console.log(`Server listening on port ${port}`)  
}) 