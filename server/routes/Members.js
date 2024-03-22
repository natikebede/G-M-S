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

// get all memebership that end on specific date range

router.get ("/Memebership/Get-ALL-end/:data1/:date2",async(req,res)=>{
    try {
        const start_date= req.params.data1;
        const end_date=req.params.date2
        const result= await Db.query ("select member.fullname,member.contact_number,member.age,member.gender,member.weight,membership.membership_id,membership.memebership_type,membership.member_id,membership.start_date,membership.end_date,membership.status,membership.registration_date,membership.account_id from membership inner join member on member.member_id = membership.member_id where membership.end_date BETWEEN $1 AND $2",
        [
            start_date,
            end_date
        ]
        );
        
        
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

//for deactivation memebership
router.get ("/Memebership/Get-ALL-end/:data1/:date2",async(req,res)=>{
    try {
        const start_date= req.params.data1;
        const end_date=req.params.date2
        const result= await Db.query ("select member.fullname,member.contact_number,member.age,member.gender,member.weight,membership.membership_id,membership.memebership_type,membership.member_id,membership.start_date,membership.end_date,membership.status,membership.registration_date,membership.account_id from membership inner join member on member.member_id = membership.member_id where membership.end_date BETWEEN $1 AND $2",
        [
            start_date,
            end_date
        ]
        );
        
        
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

//for deactivation memebership
router.put ("/Memebership/Deactivate",async(req,res)=>{

const membership_id=req.body.Membership_id;
try {
    const result= await Db.query("update membership set status='Deactivate' where membership_id=$1 returning *",
    [membership_id])
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


// update memeber info
router.put ("/Memebership/Update-info",async(req,res)=>{
        try {
        const data=req.body.user_info;
        console.log(data);
    const result= await Db.query(" update member set fullname=$1,age=$2,gender=$3,contact_number=$4,weight=$5 where member_id=$6 returning *",
    [   data.fullname,
        data.age,
        data.gender,
        data.contact_number,
        data.weight,
        data.member_id

    ])
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
        res.status(201).json({
            status:"fail",
          error:error,
          
           });
        
    }

})

// Memember ship renewal
router.put("/Memebership/renewal/:memebership_id",async(req,res)=>{

    try {
        const cashier=req.body.account;
        const  data= req.body.selected_data;
      var  result= await Db.query ("update membership set memebership_type=$1,start_date=$2,end_date=$3,status='Active' where membership_id=$4 returning *",
        [
            data.Memembership,
            data.start_date,
            data.end_date,
            req.params.memebership_id,
           

        ]
        );
        result= await Db.query ("insert into payment (membership_id,account_id,amount,payment_date,payment_type)values ($1,$2,$3,$4,$5) returning *",
        [
            req.params.memebership_id,
            cashier.account_id,
            data.selected_month[0].amount,
            data.date,
            "Renewal"
        ]);

        res.status(200).json
        (
            {
                status:"success",
                result:result.rowCount,
                data:result.rows
                  
                
            }
        )

    } catch (error) 
    {
        console.log(error)
        res.status(201).json({
            status:"fail",
          error:error,
          
           });
    }


})

 module.exports=router;