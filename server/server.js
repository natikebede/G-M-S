
require('dotenv').config();
const express= require("express");
const Db = require("./Db");
const cors =require("cors");
const jwt= require("jsonwebtoken");
const membership_routes= require('./routes/Members');

const port= process.env.PORT || 5002;
const app =express();

app.use(cors());
app.use(express.json());

//middel ware for authnication
app.use((req,res,next)=>{
   
    token=req.body.token;
    if(token ==null && token  == undefined)
    { 

  
      req.data=
      {
        status:"there is no token",
        result:null,
        auth:false
      } 
      
    }
    else
    {
      
        jwt.verify(token,process.env.TOKEN,(err,user)=>{
            if(err)
            {
              
         
                req.data={
                  status:"this token is not valid",
                  result:null,
                  auth:false
                } 
                
            }
            else
            {   
               
                req.data={
                  status:"this token is Valid",
                  result:1,
                  auth:true,
                  user:user,
                } 
                
               
            }
        })
    }
   
    next();

})
app.post("/",async(req,res)=>
{

   if(req.data.auth==true)
   {

        res.status(200).json(

            {
                status:"this token is Valid",
                result:1,
                auth:true,
                user:req.data.user,
              } 
        )

   }
   else
   {
    res.status(200).json(

        {
            status:req.data.status,
            result:req.data.result,
            auth:false,
            
          } 
    )

   }



       
});
//middle ware


app.use(membership_routes)


//





// for cashier login
app.post("/Login",async(req,res)=>
{
    try {
        console.log("this is the username",req.body.username);
        const result= await Db.query("select * from accounts where username=$1 and password=$2",[req.body.username,req.body.password]);
        const user=result.rows[0]
        const token= jwt.sign(user,process.env.TOKEN)
        res.json
        (
            {
                status:"success",
                result:result.rowCount,
                data:{
                    user:result.rows[0],
                    token
                }
            }
        )
        // console.log (result);
    } catch (error) {
        console.log(error);
    }
})






// for searching for a bus

 


 


app.listen (port,()=>{
    console.log(`server is up and listening on port ${port} `);
})