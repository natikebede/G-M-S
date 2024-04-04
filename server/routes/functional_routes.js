const { pool } = require('./pool');
const express= require('express');
const router= express.Router();

// get todays sales and reservations

router.get("/get_all_sales_today/:today", async(req,res)=>
{  
   try {
       const [result]= await pool.query("SELECT sum(trips.price), count(reservation.reser_id) FROM reservation INNER JOIN trips ON trips.trip_id = reservation.trip_id INNER JOIN passenger ON passenger.passenge_id  = reservation.pass_id where  reservation.reser_date=?",
       [req.params.today]);
           console.log(result);

       res.status(200).json
       (
           {
               status:"success",
               result:result.length,
               data:result
                 
               
           }
       )
   } catch (error) {
       console.log(error);
   }

})

router.get("/get_all_sales_thismonth/:today/:fMonth", async(req,res)=>
{  console.log(" date one is "+ req.params.fMonth + " and the second date"+ req.params.today) 
   try {
       const result= await pool.query("SELECT sum(trips.price), count(reservation.reser_id) FROM reservation INNER JOIN trips ON trips.trip_id = reservation.trip_id INNER JOIN passenger ON passenger.passenge_id  = reservation.pass_id where  reservation.reser_date BETWEEN $ AND $1 ",
       [req.params.fMonth,req.params.today]);
           console.log(result);

       res.status(200).json
       (
           {
               status:"success",
               result:result.length,
               data:result
                 
               
           }
       )
   } catch (error) {
       console.log(error);
   }

})




 // get todays sales and reservations cashier
 router.get("/get_all_sales_today/:cashier_id/:today", async(req,res)=>
 {  
    try {
        const result= await pool.query("SELECT sum(trips.price), count(reservation.reser_id) FROM reservation INNER JOIN trips ON trips.trip_id = reservation.trip_id INNER JOIN passenger ON passenger.passenge_id  = reservation.pass_id where reservation.cashier_id=? and reservation.reser_date=?",
        [req.params.cashier_id,req.params.today]);
            console.log(result);

        res.status(200).json
        (
            {
                status:"success",
                result:result.length,
                data:result
                  
                
            }
        )
    } catch (error) {
        console.log(error);
    }

 })
// this month total sales  cashier
router.get("/get_all_sales_thismonth/:cashier_id/:today/:fMonth", async(req,res)=>
{  
   try {
       const result= await pool.query("SELECT sum(trips.price), count(reservation.reser_id) FROM reservation INNER JOIN trips ON trips.trip_id = reservation.trip_id INNER JOIN passenger ON passenger.passenge_id  = reservation.pass_id where reservation.cashier_id=? and reservation.reser_date BETWEEN ? AND ? ",
       [req.params.cashier_id,req.params.fMonth,req.params.today]);
           console.log(result);

       res.status(200).json
       (
           {
               status:"success",
               result:result.length,
               data:result
                 
               
           }
       )
   } catch (error) {
       console.log(error);
   }

})
module.exports=router;