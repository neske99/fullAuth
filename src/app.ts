import express from 'express'
import dotenv from 'dotenv'
import autRouter from './routers/auth.router.ts'
import errorHandlingMiddleware from './middlewares/errorHandling.middleware.ts';
import mongoose from 'mongoose';
dotenv.config()
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string).then(()=>{
    console.log("Mongodb connected")
  }
).catch((err)=>{
  console.log(err.message)
})

const app=express();
app.use(express.json())


app.use('/auth',autRouter);

app.get("/",(req,res,next)=>{

  res.send("helloWorld");
})
app.use(errorHandlingMiddleware)

export default app