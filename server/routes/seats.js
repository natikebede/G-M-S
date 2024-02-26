const Db = require("../Db");
const express= require('express');
const router= express.Router();

// getting all the seats of a selected trip
router.get("/Get_all_seats/:trip_id/:travel_date",async(req,res)=>{

    try {
        const result=await Db.query("select reser_seat from reservation where travel_date=$1 and trip_id=$2",[req.params.travel_date,req.params.trip_id]);
         res.status(200).json({
            status:"success",
                result:result.rowCount,
                 seats:result.rows
                  
    
         })
         console.log(result);
    } catch (error) {
        console.log(error)
    }
 


 });
 module.exports=router;
