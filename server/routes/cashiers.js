const express= require('express');
const Db = require('../Db');
const router= express.Router();
router.get("/cashier/count",async(req,res)=>{
 try {

    const result= await Db.query("select count(cashier_id) from cashier where role='Cashier'");
    res.status(200).json({
        status:"success",
        result:result.rowCount,
        count: result.rows[0].count
    })
    
 } catch (error) {
    console.log(error);
 }


});

//for searching if username is taken
router.get("/cashier/check/:username",async(req,res)=>{

   try {
      const result= await Db.query("select * from cashier where username=$1",[req.params.username])
       
      res.status(200).json({
         status:"success",
        result:result.rowCount,
       
        })
   } catch (error) {
      console.log(error);
   }

});

// for adding cashier and admin to database
router.post("/cashier/Add/",async(req,res)=>{
   try {
      const data=req.body.info;
         const result= await Db.query ("insert into cashier (cashier_name,gender,username,password,role,status,registration_date,phonenumber) values($1,$2,$3,$4,$5,$6,$7,$8) returning *",
        [data.fullname,data.gender,data.username,data.password,data.role,data.status,data.date,data.phonenumber] )
        res.status(200).json({
         status:"success",
        data:result.rows[0],
       
        })
      
   } catch (error) {
      res.status(201).json({
         status:"fail",
       error:error,
       
        })
   }


})

// get all cashiers and admins
router.get("/cashier/All",async(req,res)=>{
 try {
   const result= await Db.query ("select * from cashier ORDER BY  registration_date DESC");
   res.status(200).json({
      status:"success",
      result:result.rowCount,
     data:result.rows,
    
     })
 } catch (error) {
   console.log(error);
 }

});


//edit cashier or admin
router.put("/cashier/edit",async(req,res)=>{
   try {
      const data=req.body.info;
     const result= await Db.query ("update cashier set cashier_name=$1,gender =$2,status=$3,phonenumber=$4,role=$5 where cashier_id=$6 returning *",
     [ data.fullname,data.gender,data.status,data.phonenumber,data.role,data.id ]);
     res.status(200).json({
        status:"success",
        result:result.rowCount,
       data:result.rows,
      
       })
   } catch (error) {
     console.log(error);
   }
  
  });




module.exports=router;
