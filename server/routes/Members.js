const Db = require("../Db");
const express= require('express');
const router= express.Router();
// Add a memeber
router.post("/Membership/signup_member", async(req,res)=>
 {  
    const data= req.body.user
    try {
        var result= await Db.query("insert into member(fullname,age,gender,contact_number,weight) values ($1,$2,$3,$4,$5) returning *"
       ,[
        data.fullname,
        data.age,
        data.gender,
        data.phonenumber,
        data.weight
       ]);
      const member_id=  result.rows[0].member_id
       result=await Db.query("insert into membership (memebership_type,member_id,start_date,end_date,status,registration_date,account_id) values"+ 
       "($1,$2,$3,$4,$5,$6,$7) returning *",
       [
        data.Memembership,
        member_id,
        data.start_date,
        data.end_date,
        data.status,
        data.registration_date,
        data.account_id
        ,

       ])
       const membership_id=result.rows[0].membership_id
       result=await Db.query("insert into payment (membership_id,account_id,amount,payment_date)values ($1,$2,$3,$4) returning *",
       [
        membership_id,
        data.account_id,
        (parseFloat(data.selected_month[0].amount)+200),
        data.registration_date,
        ])
       console.log( "user registerd");
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
        await Db.query("ROLL Back");
    }

 })

 //get all Memembership
 router.get ("/Memebership/Get-ALL",async(req,res)=>{
        try {
            const result= await Db.query ("select member.fullname,member.contact_number,member.age,member.gender,member.weight,membership.membership_id,membership.memebership_type,membership.member_id,membership.start_date,membership.end_date,membership.status,membership.registration_date,membership.account_id from membership inner join member on member.member_id = membership.member_id");
            
            
            res.status(200).json
            (
                {
                    status:"success",
                    result:result.rowCount,
                    data:result.rows
                      
                    
                }
            )

        } catch (error) {
            console.log(error)
        }
    
 })
 module.exports=router;