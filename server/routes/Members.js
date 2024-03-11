const Db = require("../Db");
const express= require('express');
const router= express.Router();
// get all trips 
router.get("/Membership/signup_member", async(req,res)=>
 {  
    try {
        const result= await Db.query("");
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
 module.exports=router;