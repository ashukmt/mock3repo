const express = require("express");
const env = require("dotenv");
const { connection } = require("./config/db");
const { ClassiModel } = require("./models/Classi.model");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin : "*"
}))

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send({msg:"base api end is here"})
})

app.post("/classifieds",async(req,res)=>{
    const{name,description,category,image,location,postedAt,price} = req.body;

    const new_classi = new ClassiModel({
      name,
      description,
      category,
      image,
      location,
      postedAt,
      price  
    })
    await new_classi.save(); 
    res.send({msg : "Classified Added Successfully"}) 
})

app.get("/browseclassifieds",async(req,res)=>{
    try{
        const my_classi =await ClassiModel.find();
        res.send(my_classi);
    }
    catch(err){
        console.log(err)
        console.log({msg:"getting error"})
    }
   
})

// app.get("/browseclassifieds/",async(req,res)=>{
//     const my_classi =await ClassiModel.find();
//     res.send(my_classi);
// })



app.listen(PORT,async()=>{
    try{
        await connection
        console.log("connected to db successfully")
    }
    catch(err){
        console.log("getting error while connecting")
    }
    console.log("listening on port");
})

