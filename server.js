//SERVER CREATION

const express=require('express')
const app=express();
const db=require('./db')
const personRoutes=require('./routes/personRoutes')
const menuItemRoutes=require('./routes/menuItemRoutes')

const bodyParser=require('body-parser');
app.use(bodyParser.json()); // stores the data in req.body

app.get('/',function(req, res) {
    res.send('welcome to my hotel ... how can i help you ? we have list of menus')
})


app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);gi

app.listen(3000,()=>{
    console.log('server is live ,listening to port 3000');
})

