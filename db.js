const mongoose= require('mongoose')

//define the MongoDB connection url
const mongoURL= 'mongodb://localhost:27017/restaurent'

//set up MongoDB connection
mongoose.connect(mongoURL)

//gets the default connection
//Mongoose maintains default connection  object representing the mangoDB connection
// this object is mainly responsible for interaction and event handling with the databese
const db= mongoose.connection; 

//add event listners to know the connection state or status
db.on('connected', () => {
    console.log("connected to MangoDB server");
})

db.on('error', (err) => {
    console.log("MangoDB connection error:",err);
})

db.on('disconnected', () => {
    console.log("MangoDB disconnected");
})

module.exports= db;