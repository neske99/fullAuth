import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app=express();

app.get("/",(req,res,next)=>{

  res.send("helloWorld");
})

app.listen(process.env.PORT)

