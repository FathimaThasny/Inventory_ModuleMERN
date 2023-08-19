const express = require('express')
const vendorModel = require('../../model/Purchase/vendorModel')
const router = express.Router()

//adding new vendors
router.post('/api/addvendor', async(req,res)=>{
        console.log("vendor")
    let data = new vendorModel(req.body)
    data.save()
    console.log(data)
    res.json({status : "New Vendor Added!"})
})

//display vendors
router.post('/api/viewvendors', async(req,res)=>{
    let data = await vendorModel.find({})
    res.json(data)
})

//editing vendor details
router.post('/api/editvendor', async(req,res)=>{
    console.log(req.body._id)
    let data =await vendorModel.findByIdAndUpdate({'_id': req.body._id},req.body)
    // res.json({status : 'Vendor details Updated!'})
    res.json(data)
})

module.exports = router