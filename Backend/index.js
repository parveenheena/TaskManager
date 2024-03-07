const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://localhost:27017/assignment")

const userSchema = mongoose.Schema({
    title : String,
    description: String,
    status : String 
})

const Model = mongoose.model("user",userSchema)
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("This is the home page")
})

app.post("/",async(req,res)=>{
    const post = await new Model(req.body)
    await post.save();
    res.send({"msg":"data added"})
})

app.patch("/:id",async(req,res)=>{
    const status = await Model.findByIdAndUpdate({_id:req.params.id},{status:"Completed"})
    res.send({"msg":"status updated"})
})

app.delete("/:id",async(req,res)=>{
    const status = await Model.findByIdAndDelete({_id:req.params.id})
    res.send({"msg":"task deleted"})
})

app.listen(8080,async()=>{
    await connection
    console.log("server is running at port: http://localhost:8080")
})