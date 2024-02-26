const Db = require('../Db');
const express= require('express');
const router= express.Router();
router.get("/driver/count",async(req,res)=>{
    
    try {
   
       const result= await Db.query("select count(driver_id) from driver ");
       res.status(200).json({
           status:"success",
           result:result.rowCount,
           count: result.rows[0].count
       })
       
    } catch (error) {
       console.log(error);
    }
   
   
   });
   module.exports=router;