const express = require('express')
const billpaymentModel = require('../../model/Purchase/billpaymentModel')
const purchaseOrderModel = require('../../model/Purchase/purchaseOrderModel')
const router = express.Router()

//adding Bills and payments
router.post('/api/addbillpayment', async(req,res)=>{
    let data = new billpaymentModel(req.body)
    data.save()
    res.json({status : 'Bill Payment Added!'})
    const purchase = await purchaseOrderModel.findByIdAndUpdate({'_id':req.body.purchase_id}, { $set: { status: req.body.status } });

})

//display all payments
router.post('/api/viewpayments', async(req,res)=>{
    const paymentdata= await  billpaymentModel.aggregate([
        {
            "$lookup": {
                "from": "purchaseorders",
                "localField": "purchase_id",
                "foreignField": "_id",
                "as": "purchaseOrder"
              }
            },
            {
              "$lookup": {
                "from": "vendors",
                "localField": "vendor_id",
                "foreignField": "_id",
                "as": "vendorData"
              }
            },
            {
              "$project": { 
                "bill_number": 1,
                "bill_date": 1,
                "vendor_id": 1,
                "vendorName": "$vendorData.name",
                "vendorMail" : "$vendorData.email",
                "vendorPhone" : "$vendorData.contact_number",
                "vendorAddress": "$vendorData.adress",
                "purchase_id": 1,
                "OrderNumber": "$purchaseOrder.order_number",
                "OrderItems" : "$purchaseOrder.items",
                "totalAmount" : "$purchaseOrder.totalAmount",
                "status" : 1
              }
            }
    ])
    res.json(paymentdata)
})

module.exports = router