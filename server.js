const express = require('express')
const app = express()
const path = require('path')
const authRoutes = require('./server/routes/authRoutes')
const electionRoutes = require('./server/routes/electionRoutes')
const port = process.env.PORT || 3001
require('./server/db/connectToDB')

const assetFolder = process.env.NODE_ENV === 'production'?'build':'public'

app.use(express.static(path.join(__dirname,'client',`${assetFolder}`)))

app.use('/auth',authRoutes)

app.use('/election',electionRoutes)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client',`${assetFolder}`,'index.html'))
})

app.listen(port,()=>{ 
    console.log(`Server listening on port ${port}`)  
}) 