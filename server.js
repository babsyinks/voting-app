const express = require('express')
const path = require('path')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const authRoutes = require('./server/routes/authRoutes')
const electionRoutes = require('./server/routes/electionRoutes')
const port = process.env.PORT || 3001
const app = express()

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
app.use(rateLimiter({max:2000,windowMs:24*60*60*1000,message:'Maximum Allowed Requests From This Device Has Been Exceeded'}))
app.use(mongoSanitize())

require('./server/db/connectToDB')

const assetFolder = process.env.NODE_ENV === 'production'?'build':'public'

app.use(express.static(path.join(__dirname,'client',`${assetFolder}`)))

app.use('/auth',authRoutes)

app.use('/election',electionRoutes)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client',`${assetFolder}`,'index.html'))
})

app.use((err,req,res,next)=>{
    res.send({err})
})

app.listen(port,()=>{ 
    console.log(`Server listening on port ${port}`)  
}) 