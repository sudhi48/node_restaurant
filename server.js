//SERVER CREATION

const express = require('express')
const app = express();
const db = require('./db')
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')
const passport=require('./auth')

require('dotenv').config();
const PORT = process.env.PORT || 3000

const bodyParser=require('body-parser');

app.use(bodyParser.json()); // stores the data in req.body

//Middleware Function
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`)
    next();
}

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local', {session: false})
app.get('/',function(req, res) {
    res.send('welcome to my hotel ... how can i help you ? we have list of menus')
})


app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);



app.listen(PORT,()=>{
    console.log('server is live ,listening to port 3000');
})

