const express = require('express')
const invoiceModel = require('../../model/Sales/invoiceModel')
const deliveryChallanModel = require('../../model/Sales/deliveryChallan')
const { salesOrderModel } = require('../../model/Sales/salesOrder')
const packageModel = require('../../model/Sales/packageModel')
const router = express.Router()

//creating invoices
router.post('/api/newinvoice', async(req,res)=>{
    let data = new invoiceModel(req.body)
    data.save()
    res.json({status : "Invoice Created Successfully"})

    const challan = await deliveryChallanModel.findOneAndUpdate({'order_id': req.body.order_id},{$set :{status : req.body.payment_status}})
    const salesorder = await salesOrderModel.findByIdAndUpdate({'_id': req.body.order_id},{$set:{order_status : req.body.payment_status}})
    const package = await packageModel.findOneAndUpdate({'order_id': req.body.order_id},{$set :{status : req.body.payment_status}})
})

//display invoices
router.post('/api/viewinvoices', async(req,res)=>{
    let data = await invoiceModel.aggregate([
        {
            "$lookup" : {
                "from" : "salesorders",
                "localField" : "order_id",
                "foreignField" : "_id",
                "as" : "order_details"
            }
        },
        {
            "$lookup" : {
                "from" : "customers",
                "localField" : "customer_id",
                "foreignField" : "_id",
                "as" : "customerDetails"
            }
        },
        {
            "$project" : {
                "invoice_number" : 1,
                "invoice_date" : 1,
                "order_id" : 1,
                "orderNumber" : "$order_details.order_number",
                "customer_id" : 1,
                "customerName" : "$customerDetails.name",
                "customerAddress" : "$customerDetails.billing_address",
                "customerMail" : "$customerDetails.email",
                "orderItems" : "$order_details.items",
                "totalPrice" : "$order_details.total_price",
                "payment_status" : 1
            }
        }
    ])
    res.json(data)
})

router.post('/api/getinvoice', async(req,res) => {
    const invoiceNumber = req.body.invoice_number

    let data = await invoiceModel.aggregate([
        {
            "$lookup" : {
                "from" : "salesorders",
                "localField" : "order_id",
                "foreignField" : "_id",
                "as" : "order_details"
            }
        },
        {
            "$lookup" : {
                "from" : "customers",
                "localField" : "customer_id",
                "foreignField" : "_id",
                "as" : "customerDetails"
            }
        },
        {
            "$match" : {
                'invoice_number' : invoiceNumber
            }
        },
        {
            "$project" : {
                // "invoice_number" : 1,
                // "invoice_date" : 1,
                // "order_id" : 1,
                "customer_id" : 1,
                "customerName" : "$customerDetails.name",
                "customerAddress" : "$customerDetails.billing_address",
                "customerMail" : "$customerDetails.email",
                "totalPrice" : "$order_details.total_price"
            }
        }
    ])

    console.log(data)
    res.json(data)
})

module.exports = router