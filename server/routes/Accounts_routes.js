const { pool } = require('../Db');
const express= require('express');
const router= express.Router();

// create account for cashier and  admin
router.post("/Accounts/add-account",async(req,res)=>{
    const data= req.body.info;
    try {
        const [result] =await pool.query("insert into employee (fullname,contact_number,position,start_date,sallery,created_by,status,Gender) values (?,?,?,?,?,?,?,?)  ",
                [
                    data.fullname,
                    data.phonenumber,
                    data.role,
                    data.date,
                    6000,
                    1,
                    data.status,
                    data.gender
                ])  
                
       const emp_id= result.insertId
            try {
                const result =await pool.query("insert into accounts (username,password,role,status,created_date,emp_id) values (?,?,?,?,?,?) returning * ",
       [data.username,data.password,data.role,data.status,data.date,emp_id] );
       
       res.status(200).json({
        status:"success",
       result:result.affectedRows})
    
    } catch (error) {
                const result =await pool.query("delete from employee where emp_id=? ",
                [emp_id] );
                console.log(error)
                res.status(201).json({
                    status:"fail",
                  error:error,
                  
                   });
            }
      
    } catch (error) {
      
        console.log(error);
        res.status(201).json({
            status:"fail",
          error:error,
          
           });
    }
})


// check if a username is taken 
router.get ("/Account/check/:username", async(req,res)=>{

    try {
        const [result]= await pool.query("select * from accounts where username=?",[req.params.username])
         
        res.status(200).json({
           status:"success",
          result:result.length,
         
          })
     } catch (error) {
        console.log(error);
     }

})
// list all accounts

router.get("/Accounts/All",async(req,res)=>{
    try {
      const [result]= await pool.query ("select employee.emp_id,employee.fullname,employee.contact_number,employee.position,employee.gender,employee.start_date,employee.sallery,accounts.username,accounts.status,accounts.role from employee inner join accounts on accounts.emp_id=employee.emp_id ORDER BY  accounts.created_date DESC ");
      res.status(200).json({
         status:"success",
         result:result.length,
        data:result,
       
        })
    } catch (error) {
      console.log(error);
    }
   
   });



//update account data
router.put("/Accounts/Update",async(req,res)=>{
    try {
       const data=req.body.info;
       console.log(data);
       const result= await pool.query (" update employee set fullname=?,contact_number=?position=?,sallery=?,status=?,gender=? where emp_id=? ",
      [ data.fullname,data.phonenumber,data.role,data.sallery,data.status,data.gender,data.id ]);
      try {
        const result= await pool.query ("  update accounts set role=$1,status=$2 where emp_id=$3 ",
      [data.role,data.status,data.id ]);
        res.status(200).json({
            status:"success",
            result:result.affectedRows,
           data:result.insertId,
          
           })
      } catch (error) {
        console.log(error);
        res.status(201).json({
            status:"fail",
          error:error,
          
           });
      }
    } catch (error) {
      console.log(error);
      res.status(201).json({
        status:"fail",
      error:error,
      
       });
    }
   
   });
 
module.exports=router;