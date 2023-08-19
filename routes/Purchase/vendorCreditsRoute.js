const express = require('express')
const vendorCreditModel = require('../../model/Purchase/vendorCreditModel')
const purchaseOrderModel = require('../../model/Purchase/purchaseOrderModel')
const billpaymentModel = require('../../model/Purchase/billpaymentModel')
const router = express.Router()

//create vendor credits
router.post('/api/newcredit', async(req,res)=>{
    let data = new vendorCreditModel(req.body)
    data.save()
    res.json({status : 'New Credit Added!'})
    const purchase = await purchaseOrderModel.findByIdAndUpdate({'_id' : req.body.purchase_id}, {$set : { status : req.body.status}})
    const bills = await billpaymentModel.findOneAndUpdate({purchase_id : req.body.purchase_id}, {$set : { status : req.body.status}})
})

//display credits
router.post('/api/viewallcredits', async(req,res)=>{
    let data = await vendorCreditModel.aggregate([
        {
            "$lookup" : {
                "from" : "purchaseorders",
                "localField" : "purchase_id",
                "foreignField" : "_id",
                "as" : "purchaseData"
            }
        },
        {
            "$lookup" : {
                "from" : "vendors",
                "localField" : "vendor_id",
                "foreignField" : "_id",
                "as" : "vendorData"
            }
        },
        {
            "$project" : {
                "credit_date" : 1,
                "credit_number" : 1,
                "status" : 1,
                "purchase_id" : 1,
                "purchaseNumber" : "$purchaseData.order_number",
                "purchaseItems" : "$purchaseData.items",
                "totalAmount" : "$purchaseData.totalAmount",
                "vendor_id" : 1,
                "vendorName" : "$vendorData.name",
                "vendorMail" : "$vendorData.email",
                "vendorAddress" : "$vendorData.adress"
            }
        }
    ])
    res.json(data)
})

//display credit of purticular vendor
router.post('/api/viewvendorcredit', async(req,res)=>{
    let data = await vendorCreditModel.find({'vendor_id': req.body.vendor_id})
    res.json(data)
})

module.exports = router