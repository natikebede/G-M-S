const Db = require("../Db");
const express= require('express');
const router= express.Router();
// get all trips 
router.get("/trips/get_all_trips", async(req,res)=>
 {  
    try {
        const result= await Db.query("select trips.trip_id,trips.start_location,trips.destination,trips.price,trips.leave_time,trips.trip_time,bus.bus_no from trips inner join bus on bus.bus_id= trips.bus_id");
            console.log(result.rows);

        res.status(200).json
        (
            {
                status:"success",
                result:result.rowCount,
                data:result.rows
                  
                
            }
        )
    } catch (error) {
        console.log(error);
    }

 })
 router.post("/Trips/check_trip",async(req,res)=>{
    try {
        const trip= req.body.trip;
    const result= await Db.query("select * from trips where start_location=$1 and destination=$2 and leave_time=$3 and bus_id=$4",
    [
      trip.Start_location,
      trip.Destination,
      trip.Leave_time,
      trip.bus
  
    ]);
    res.status(200).json({
        status:"success",
        result:result.rowCount,
        trips: result.rows
    });
  } catch (error) {
     console.log(error);
     res.status(201).json({
        status:"fail",
        error:error,
    });
  }
    

 })
 router.post("/Trips/Add_trip",async(req,res)=>{
    try {
        const trip= req.body.trip;
    const result= await Db.query("insert into trips (start_location,destination,price,leave_time,trip_time,bus_id) values($1,$2,$3,$4,$5,$6) returning *",
    [
      trip.Start_location,
      trip.Destination,
      trip.Price,
      trip.Leave_time,
      trip.Trip_time,
      trip.bus
  
    ]);
    res.status(200).json({
        status:"success",
        result:result.rowCount,
        trips: result.rows
    });

    } catch (error) {
        console.log(error);
        res.status(201).json({
           status:"fail",
           error:error,
       }); 
    }
 })

router.delete("/Trips/:Trip_id", async(req,res)=>{
   try {
    
    const result= await Db.query("delete from trips where trip_id=$1 ",
    [req.params.Trip_id]);
    res.status(200).json({
        status:"success",
        result:result.rowCount,
       
    });
   } catch (error) {
    console.log(error);
    res.status(201).json({
       status:"fail",
       error:error,
   });  
   } 

});

 module.exports=router;