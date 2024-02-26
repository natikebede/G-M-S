
require('dotenv').config();
const express= require("express");
const Db = require("./Db");
const cors =require("cors");
const jwt= require("jsonwebtoken");
const cashier_routes= require('./routes/cashiers');
const  reservation_routes= require('./routes/reservations');
const seats_routes= require('./routes/seats');
const trips_routes=require('./routes/trips');
const driver_routes=require('./routes/Drivers');
const functonal_routes=require('./routes/functional_routes')
const Bus_routes= require('./routes/Bus')
const port= process.env.PORT || 5002;
const app =express();

app.use(cors());
app.use(express.json());
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


app.use(cashier_routes)
app.use(seats_routes);
app.use(trips_routes);
app.use(driver_routes);
app.use(reservation_routes);
app.use(functonal_routes);
app.use(Bus_routes);

//





// for cashier login
app.post("/Login",async(req,res)=>
{
    try {
        console.log("this is the username",req.body.username);
        const result= await Db.query("select * from cashier where username=$1 and password=$2",[req.body.username,req.body.password]);
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
app.post("/Searchbus",async(req,res)=>
{
    try {
        const result= await Db.query("SELECT trips.trip_id,trips.start_location,trips.destination,trips.price,"+
        "trips.leave_time,trips.trip_time,bus.seats,bus.bus_no FROM trips INNER JOIN bus ON bus.bus_id"+
        " = trips.bus_id where start_location= $1 and destination=$2 ",[req.body.fromlocation,req.body.Destination])
        res.status(200).json
        (
            {
                status:"success",
                result:result.rowCount,
                data:{
                    trip:result.rows
                  
                }
            }
        )

        
    } catch (error) {
        console.log(error);
    }

});

 


 


app.listen (port,()=>{
    console.log(`server is up and listening on port ${port} `);
})