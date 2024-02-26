const Db = require("../Db");
const express= require('express');
const router= express.Router();
 // limited reservation return
 router.get("/get_Allreservation_limted/:cashier_id", async(req,res)=>
 {  
    try {
        const result= await Db.query("SELECT trips.trip_id,trips.start_location,trips.destination,trips.price,reservation.travel_date ,reservation.reser_id,reservation.reser_seat,reservation.reser_seat,reservation.pickup,reservation.booking_id, passenger.fullname,passenger.contact_number FROM reservation INNER JOIN trips ON trips.trip_id = reservation.trip_id INNER JOIN passenger ON passenger.passenge_id  = reservation.pass_id where reservation.cashier_id=$1 ORDER BY reservation.reser_date LIMIT  5",
        [req.params.cashier_id]);
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
 // get all reservation of the cashier
 router.get("/getAllreservation/:cashier_id", async(req,res)=>
 {  
    try {
        const result= await Db.query("SELECT trips.trip_id,trips.start_location,trips.destination,trips.price,reservation.travel_date ,reservation.reser_id,reservation.reser_seat,reservation.reser_seat,reservation.pickup,reservation.booking_id, passenger.fullname,passenger.contact_number FROM reservation INNER JOIN trips ON trips.trip_id = reservation.trip_id INNER JOIN passenger ON passenger.passenge_id  = reservation.pass_id where reservation.cashier_id=$1 ORDER BY reservation.reser_date",
        [req.params.cashier_id]);
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
 // get reservation for reprint
 router.get("/get_a_reservation/:reser_id", async(req,res)=>
 {  
    try {
        const result= await Db.query("SELECT trips.trip_id,trips.start_location,trips.leave_time,trips.trip_time,trips.destination,trips.price,reservation.travel_date ,reservation.reser_id,reservation.reser_seat,reservation.reser_seat,reservation.pickup,reservation.booking_id, passenger.fullname,passenger.contact_number FROM reservation INNER JOIN trips ON trips.trip_id = reservation.trip_id INNER JOIN passenger ON passenger.passenge_id  = reservation.pass_id where reservation.reser_id=$1 ORDER BY reservation.reser_date",
        [req.params.reser_id]);
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

 // for making reservations
router.post ("/MakeTicket",(req,res)=>{
    var status =true;
 const Booking_id= req.body.Booking_ID;
    try {
        req.body.passengers.map(async(pass)=>{
            console.log(pass.Destination.trip_id);
            const result= await Db.query("insert into passenger (fullname,contact_number) values ($1,$2) returning *",[pass.name,pass.phonenumber]);
            try {
                
              const  result2 =await Db.query(" insert into reservation (pass_id,trip_id,reser_seat,travel_date,pickup,reser_date,booking_id,cashier_id)"+
                "values($1,$2,$3,$4,$5,$6,$7,$8) returning *",[result.rows[0].passenge_id,pass.Destination.trip_id,pass.seat,pass.travel_date,pass.pickup,pass.reservation_date,Booking_id,pass.cashier_id])
                console.log(result2.rows[0]);
                
                
            } catch (error) {

                console.log(error)
                status=false;
                console.log(status);
                
            }
           

        }); 
        console.log("here is another status",status); 
           
    } catch (error) {
        console.log (error)
        status=false;
        res.send(status);   
    }
    res.send(status);     
});
module.exports=router;