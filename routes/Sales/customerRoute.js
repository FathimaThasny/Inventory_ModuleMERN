const express = require('express')
const customerModel = require('../../model/Sales/customerModel')
const router = express.Router()

//adding a new customer
router.post('/api/addcustomer', async(req,res)=>{
    let data = new customerModel(req.body)
    data.save()
    res.json({status : "New Customer Registered!"})
})

//displaying all customers
router.post('/api/viewcustomers', async(req,res)=>{
    let data = await customerModel.find({})
    res.json(data)
})

//updating customer data
router.post('/api/editcustomer', async(req,res)=>{
    console.log(req.body._id)
    console.log(req.body)
    let data = await customerModel.findOneAndUpdate({"_id": req.body._id},req.body)
    // console.log(data)
    res.json({status : "data Updated"})
})

module.exports = router