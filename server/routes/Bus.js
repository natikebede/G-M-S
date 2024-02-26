const Db = require('../Db');
const express= require('express');
const router= express.Router();
router.get("/Bus/count",async(req,res)=>{
    
    try {
   
       const result= await Db.query("select count(bus_id) from bus ");
       res.status(200).json({
           status:"success",
           result:result.rowCount,
           count: result.rows[0].count
       });
       
    } catch (error) {
       console.log(error);
    }
   
   
   });

   router.get("/Bus/get_all_bus",async(req,res)=>{

      try {
         const result= await Db.query("Select * from Bus")
         res.status(200).json({
            status:"success",
            result:result.rowCount,
            Bus: result.rows
        });
      } catch (error) {
         console.log(error);
         res.status(201).json({
            status:"fail",
            error:error,
        });
      }
   })
   module.exports=router;