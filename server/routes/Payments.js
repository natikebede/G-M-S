const { pool } = require('../Db');
const express= require('express');
const router= express.Router();

  // get all payments_reports for specfic cashier

  router.get("/Payments/Get-ALL/:account_id",async(req,res)=>{

    try {
        const [result]=await pool.query("select member.fullname,member.contact_number,membership.membership_id,membership.memebership_type,membership.member_id,membership.end_date,payment.payment_id,payment.account_id,payment.amount,"+
        "payment.payment_date,payment_type from "+
       " membership inner join member on member.member_id = membership.member_id"+
       " inner join payment on payment.membership_id = membership.membership_id where payment.account_id=? order by payment.payment_date desc",
       [
        req.params.account_id
       ])
        res.status(200).json
        (
            {
                status:"success",
                result:result.length,
                data:result
                  
                
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



  //generate report based on filter parametrs fro the cashier

  router.post("/Payments/Get-ALL/filterd/:account_id",async(req,res)=>{
        const filter_data= req.body.filter_info;
        var result=null
    try {
        //if dates and payment type is set
        if(filter_data.from_date!==null&& filter_data.to_date!==null && filter_data.type!=null)
        {
             [result]=await pool.query("select member.fullname,member.contact_number,membership.membership_id,membership.memebership_type,membership.member_id,membership.end_date,payment.payment_id,payment.account_id,payment.amount,"+
            "payment.payment_date,payment_type from "+
           " membership inner join member on member.member_id = membership.member_id"+
           " inner join payment on payment.membership_id = membership.membership_id where payment.account_id=? and payment.payment_type=?and payment.payment_date BETWEEN ?and ? ORDER BY  payment.payment_date desc",
           [
            req.params.account_id,
            filter_data.type,
            filter_data.from_date,
            filter_data.to_date
           ])
        }
        //if only dates are set
        else if(filter_data.from_date!==null&& filter_data.to_date!==null && filter_data.type==null){

            [result]=await pool.query("select member.fullname,member.contact_number,membership.membership_id,membership.memebership_type,membership.member_id,membership.end_date,payment.payment_id,payment.account_id,payment.amount,"+
            "payment.payment_date,payment_type from "+
           " membership inner join member on member.member_id = membership.member_id"+
           " inner join payment on payment.membership_id = membership.membership_id where payment.account_id=?  and payment.payment_date BETWEEN ? and ? ORDER BY  payment.payment_date desc",
           [
            req.params.account_id,
            filter_data.from_date,
            filter_data.to_date
           ])

        }
        //if only type is set
        else if(filter_data.from_date==null&& filter_data.to_date==null && filter_data.type!==null){

            [result]=await pool.query("select member.fullname,member.contact_number,membership.membership_id,membership.memebership_type,membership.member_id,membership.end_date,payment.payment_id,payment.account_id,payment.amount,"+
            "payment.payment_date,payment_type from "+
           " membership inner join member on member.member_id = membership.member_id"+
           " inner join payment on payment.membership_id = membership.membership_id where payment.account_id=? and payment.payment_type=?  ORDER BY  payment.payment_date desc",
           [
            req.params.account_id,
            filter_data.type,
          
           ])

        }
        // if start date is only set
        else if(filter_data.from_date!==null&& filter_data.to_date==null && filter_data.type==null){

            [result]=await pool.query("select member.fullname,member.contact_number,membership.membership_id,membership.memebership_type,membership.member_id,membership.end_date,payment.payment_id,payment.account_id,payment.amount,"+
            "payment.payment_date,payment_type from "+
           " membership inner join member on member.member_id = membership.member_id"+
           " inner join payment on payment.membership_id = membership.membership_id where payment.account_id=? and payment.payment_date >= ?  ORDER BY  payment.payment_date desc",
           [
            req.params.account_id,
            filter_data.from_date,
          
           ])

        }
        // if start date and type is set
       else if(filter_data.from_date!==null&& filter_data.to_date==null && filter_data.type!=null)
        {
             [result]=await pool.query("select member.fullname,member.contact_number,membership.membership_id,membership.memebership_type,membership.member_id,membership.end_date,payment.payment_id,payment.account_id,payment.amount,"+
            "payment.payment_date,payment_type from "+
           " membership inner join member on member.member_id = membership.member_id"+
           " inner join payment on payment.membership_id = membership.membership_id where payment.account_id=? and payment.payment_type=? and payment.payment_date >=? ORDER BY  payment.payment_date desc",
           [
            req.params.account_id,
            filter_data.type,
            filter_data.from_date,
           ])
        }
        

     
        res.status(200).json
        (
            {
                status:"success",
                result:result.length,
                data:result
                  
                
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

  // get sum of todays sales  from cashier side
  router.get("/Payments/today-sales/:account_id/:today/:type",async(req,res)=>{

    try {
        var result=null;
        if(req.params.type=="Default")
       {  [result]=await pool.query(" select count(payment_id) As count,sum(amount) As sum from payment where payment_date=? and account_id=?",
        [
        req.params.today,
        req.params.account_id
       ])
    }
    else if(req.params.type=="Renewal"){
         [result]=await pool.query(" select count(payment_id) As count,sum(amount) As sum from payment where payment_date=? and account_id=?  and payment_type=?",
        [
        req.params.today,
        req.params.account_id,
        req.params.type
       ])

    }
    else if(req.params.type=="registration"){
       
        [result]=await pool.query(" select count(payment_id) As count,sum(amount) As sum from payment where payment_date=? and account_id=?  and payment_type=?",
        [
        req.params.today,
        req.params.account_id,
        req.params.type
       ])
        
    }
        console.log(result)
        res.status(200).json
        (
            {
                status:"success",
                result:result.length,
                data:result
                  
                
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