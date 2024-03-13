const Db = require("../Db");
const express= require('express');
const router= express.Router();

// create account for cashier and  admin
router.post("/Accounts/add-account",async(req,res)=>{
    const data= req.body.info;
    try {
        const result =await Db.query("insert into employee (fullname,contact_number,position,start_date,sallery,created_by,status,Gender) values ($1,$2,$3,$4,$5,$6,$7,$8) returning * ",
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
                
       const emp_id= result.rows[0].emp_id
            try {
                const result =await Db.query("insert into accounts (username,password,role,status,created_date,emp_id) values ($1,$2,$3,$4,$5,$6) returning * ",
       [data.username,data.password,data.role,data.status,data.date,emp_id] );
       
       res.status(200).json({
        status:"success",
       result:result.rowCount,})
    
    } catch (error) {
                const result =await Db.query("delete from employee where emp_id=$1 ",
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
        const result= await Db.query("select * from accounts where username=$1",[req.params.username])
         
        res.status(200).json({
           status:"success",
          result:result.rowCount,
         
          })
     } catch (error) {
        console.log(error);
     }

})
// list all accounts

router.get("/Accounts/All",async(req,res)=>{
    try {
      const result= await Db.query ("select employee.emp_id,employee.fullname,employee.contact_number,employee.position,employee.gender,employee.start_date,employee.sallery,accounts.username,accounts.status,accounts.role from employee inner join accounts on accounts.emp_id=employee.emp_id ORDER BY  accounts.created_date DESC ");
      res.status(200).json({
         status:"success",
         result:result.rowCount,
        data:result.rows,
       
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
       const result= await Db.query (" update employee set fullname=$1,contact_number=$2,position=$3,sallery=$4,status=$5,gender=$6 where emp_id=$7 returning *",
      [ data.fullname,data.phonenumber,data.role,data.sallery,data.status,data.gender,data.id ]);
      try {
        const result= await Db.query ("  update accounts set role=$1,status=$2 where emp_id=$3 returning *",
      [data.role,data.status,data.id ]);
        res.status(200).json({
            status:"success",
            result:result.rowCount,
           data:result.rows,
          
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