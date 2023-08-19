const express = require('express')
const paymentModel = require('../../model/Sales/paymentsRecieved')
const invoiceModel = require('../../model/Sales/invoiceModel')
const router = express.Router()

//creating payments
router.post('/api/newpayment', async(req,res)=>{
    let data = new paymentModel(req.body)
    data.save()
    res.json({status : 'Payment Added'})

    const invoice = await invoiceModel.findByIdAndUpdate({'_id': req.body.invoice_id},{$set:{'payment_status': req.body.status}})
})

//display payments 
router.post('/api/viewallpayments', async(req,res)=>{
    let data = await paymentModel.aggregate([
        {
            "$lookup" : {
                "from":'customers',
                "localField":"customer_id",
                "foreignField":"_id",
                "as":"customerDetails"
            }
        },
        {
            "$lookup" : {
                "from":'invoices',
                "localField" : "invoice_id",
                "foreignField" :"_id",
                "as" :"invoiceData"
            }
        },
        {
            "$project" : {
                "payment_date" : 1,
                "customer_id" :1,
                "customerName" : "$customerDetails.name",
                "customerAddress" : "$customerDetails.billing_address",
                "invoice_id" : 1,
                "invoiceNumber" : "$invoiceData.invoice_number",
                "payment_mode" : 1,
                "amount" : 1,
                "status" : 1
            }
        }
    ])
    res.json(data)
})

//display payment made by customer
router.post('/api/paymentbycustomer', async(req,res)=>{
    let data = await paymentModel.find({'customer_id':req.body.customer_id})
    res.json(data)
})

module.exports = router