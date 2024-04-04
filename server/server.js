
require('dotenv').config();
const express= require("express");
const mysql= require("mysql");

const cors =require("cors");
const jwt= require("jsonwebtoken");
const membership_routes= require('./routes/Members');
const Accounts_routes=require('./routes/Accounts_routes');
const Payment_routes=require('./routes/Payments');
const { pool } = require('./Db');
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
app.use(Accounts_routes);
app.use(Payment_routes);

//





// for cashier login
app.post("/Login",async(req,res)=>
{
   
    try {
       
      const [result]  =await pool.query ("select * from accounts where username=? and password=?",[req.body.username,req.body.password])
             
                    const user= result[0];
                    console.log(result)
                    if(result.length==0)
                    {
                        req.send
                        (
                            {
                                status:"success",
                                result:result.length,
                                data:{
                                    user:result[0],
                                    token
                                }
                            }
                        )
            
                    }
                    else
                    {
                        const token= jwt.sign({user},process.env.TOKEN)
                        res.status(200).json
                        (
                            {
                                status:"success",
                                result:result.length,
                                data:{
                                    user:result[0],
                                    token
                                }
                            }
                        )
                    }
    
                
  
       



   
    //    const test1= await Db.pool.query("select * from accounts where username=? and password=?",[req.body.username,req.body.password])
      
        // const user= result[0];
        // if(result.length==0)
        // {
        //     res.json
        //     (
        //         {
        //             status:"success",
        //             result:result.length,
        //             data:{
        //                 user:result[0],
        //                 token
        //             }
        //         }
        //     )

        // }
        // else
        // {
        //     const token= jwt.sign(user,process.env.TOKEN)
        // res.json
        // (
        //     {
        //         status:"success",
        //         result:result.length,
        //         data:{
        //             user:result[0],
        //             token
        //         }
        //     }
        // )
        // }
        
        // console.log (result);
    } catch (error) {
        console.log(error);
    }
})






// for searching for a bus

 


 


app.listen (port,()=>{
    console.log(`server is up and listening on port ${port} `);
})