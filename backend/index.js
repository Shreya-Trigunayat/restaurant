const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const dotenv = require("dotenv").config()


const app=express()
app.use(cors())
app.use(express.json({limit:"10mb"}));

const PORT = process.env.PORT || 8080;

console.log(process.env.MONGODB_URL)
// error aa rha tha to ye code
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  
})
.then(()=>{
  console.log("connected to Database")}
  )
.catch((err)=>{
  console.log(err)})

const userSchema =mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{
      type:String,
      unique:true,
    },
    password:String,
    confirmpassword:String,
    image:String
})

const userModel = mongoose.model("user",userSchema)


app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.post("/signup",(req,res)=>{
    console.log(req.body)
    const {email}=req.body

    userModel.find()
    .then({email:email},(err,result)=>{
      console.log(result)
      console.log(err)
      if (result){
        res.send({message:"Email id is already register",alert:false})
      }
      else{
        const data= userModel(req.body)
        const save=data.save()
        res.send({message:"Succesfully signup",alert:true})
      }
    })
})

app.post("/login",(req,res)=>{
  console.log(req.body)
  const {email}=req.body
  userModel.find()
  .then({email:email},(err,result)=>{
    if(result){
       
      const dataSend={
        _id:result._id,
        firstname:result.firstname,
        lastname:result.lastname,
        email:result.email,
        password:result.password,
        confirmpassword:result.confirmpassword,
        image:result.image
      };
      console.log(dataSend);
      res.send({message:"Login is successfully",alert:true,data:dataSend});
    }
    else{
      res.send({message:"this email id is not available",alert:false})
    }
  })
})

const schemaProduct =mongoose.Schema({
  name:String,
  category:String,
  image:String,
  price:String,
  description:String,
})
const productModel =mongoose.model("product",schemaProduct)

app.post("/uploadProduct",async(req,res)=>{
  console.log(req.body)
  const data=await productModel(req.body)
  const datasave=await data.save()
  res.send({message:"upload successfully"})
})

app.listen(PORT,()=>console.log("server is running at port:"+PORT))