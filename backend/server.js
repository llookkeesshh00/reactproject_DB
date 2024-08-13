
require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const passwordModel = require('./models/passwordModel')
var cors = require('cors')
const app = express()
const port = 3000

const corsOptions =
{
    origin: 'http://localhost:5173', // Allow only this origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};


app.use(cors(corsOptions));


app.use(express.json());

const connect_to_db = async () => {
    try {
        let conn = await mongoose.connect('mongodb://localhost:27017/');
        console.log("data base connected")
    } catch (error) {
        console.log("TROUBLE IN  connecting")
    }

}


connect_to_db()


app.post('/', (req, res) => {
    let r1= new passwordModel(req.body)
    r1.save();
    res.send({ message: "data recieved",password:req.body })
})


app.post('/delete', async (req, res) => {
    console.log(req.body.id)
   let d= await passwordModel.deleteMany({id:req.body.id})
    console.log(d)
    res.send({ message: "deleted sucessfully",password:req.body })
})



// this is for sending data over get mathod only limited data cna be sent over URI and can be visible (2o48 bytes) 
app.get('/', async (req, res) => {
   let t= await passwordModel.find();
   console.log(t.toString())
  //! res.send will automatically send data by parsing it i.e. (string, buffer, object, array or object )
  //! res.json() for objects we have to send and parse from client side as  res.json() 
   res.json(t)

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})