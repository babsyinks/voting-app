const express = require('express')
const path = require('path')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')
const authRoutes = require('./server/routes/authRoutes')
const electionRoutes = require('./server/routes/electionRoutes')
const timerRoutes = require('./server/routes/timerRoutes')
const helpDeskRoutes = require('./server/routes/helpdeskRoutes')
const port = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(helmet.contentSecurityPolicy({
    directives: { 
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://ka-f.fontawesome.com','https://*.fontawesome.com'],
      scriptSrc: ["'self'", 'https://kit.fontawesome.com','https://ka-f.fontawesome.com','https://*.fontawesome.com'],
      styleSrc: [
        "'self'",
        'https://fonts.googleapis.com',
        'https://kit.fontawesome.com',
        'https://ka-f.fontawesome.com',
        'https://*.fontawesome.com',
        "'unsafe-inline'"
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com','https://ka-f.fontawesome.com','https://*.fontawesome.com',"'unsafe-inline'"],
      imgSrc: ["'self'", 'https://*.fontawesome', 'https://i.ibb.co','data:'],
      baseUri: ["'self'"],
    },
  })) 
app.use(xss())
app.use(mongoSanitize())

require('./server/db/connectToDB')

const assetFolder = process.env.NODE_ENV === 'production'?'build':'public'

app.use(express.static(path.join(__dirname,'client',`${assetFolder}`)))

app.use('/auth',authRoutes)

app.use('/election',electionRoutes)

app.use('/timer', timerRoutes)

app.use('/help',helpDeskRoutes)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client',`${assetFolder}`,'index.html'))
})

app.use((err,req,res,next)=>{
    res.send({err}) 
})

app.listen(port,()=>{ 
    console.log(`Server listening on port ${port}`)  
})    