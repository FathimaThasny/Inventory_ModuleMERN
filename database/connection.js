const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { error } = require('console')
dotenv.config()

mongoose.connect(process.env.MongoDB_URI,{useNewUrlParser:true})
.then(()=>{
    console.log("Database Connection Success")
})
.catch(()=>{
    console.log("Error in Connection " + error)
})