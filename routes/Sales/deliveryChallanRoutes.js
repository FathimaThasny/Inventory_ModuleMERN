const express = require('express')
const deliveryChallanModel = require('../../model/Sales/deliveryChallan')
const packageModel = require('../../model/Sales/packageModel')
const { salesOrderModel } = require('../../model/Sales/salesOrder')
const router = express.Router()

//creating delivery challans
router.post('/api/createchallan', async(req,res)=>{
    let data = new deliveryChallanModel(req.body)
    data.save()
    res.json({status : "Challan Added!"})

    const package = await packageModel.findOneAndUpdate({'order_id': req.body.order_id},{$set :{status : req.body.status}})
    const salesorder = await salesOrderModel.findByIdAndUpdate({'_id': req.body.order_id},{$set:{order_status : req.body.status}})
})

//displayig all delivery challans
router.post('/api/viewchallan', async(req,res)=>{
    const result= await  deliveryChallanModel.find({})
    res.json(result)
})

router.post('/api/viewallchallan', async(req,res)=>{
    let data = await deliveryChallanModel.aggregate([
        {
            "$lookup": {
                "from": "salesorders",
                "localField": "order_id",
                "foreignField": "_id",
                "as": "salesOrder"
              }
            },
            {
              "$lookup": {
                "from": "customers",
                "localField": "customer_id",
                "foreignField": "_id",
                "as": "customer"
              }
            },
            {
              "$project": { 
                "challan_number": 1,
                "delivery_date": 1,
                "customer_id": 1,
                "customerName": "$customer.name",
                "customerAddress": "$customer.billing_address",
                "order_id": 1,
                "salesOrderNumber": "$salesOrder.order_number",
                "salesOrderItems.itemname" : "$salesOrder.items.item",
                "totalPrice": "$salesOrder.total_price"
              }
        }
    ])
    res.json(data)
})

//view single challans
// router.post("/api/singlechallan",async (req,res)=> {

//     let data = await deliveryChallanModel.aggregate([
//         {
//             "$lookup": {
//                 "from": "salesorders",
//                 "localField": "order_id",
//                 "foreignField": "_id",
//                 "as": "salesOrder"
//               }
//             },
//             {
//               "$lookup": {
//                 "from": "customers",
//                 "localField": "customer_id",
//                 "foreignField": "_id",
//                 "as": "customer"
//               }
//             },
//             {
//               "$project": {
//                 "challan_number": 1,
//                 "customer_id": 1,
//                 "customerName": "$customer.name",
//                 "customerAddress": "$customer.billing_address",
//                 "order_id": 1,
//                 "salesOrderNumber": "$salesOrder.order_number",
//                 "salesOrderDate": "$salesOrder.date",
//                 "salesOrderItems" : ["$salesOrder.items",0],
//                 "totalPrice": "$salesOrder.total_price"
//               }
//         },
//         {
//             "$match":{
//                 "_id" : {
//                     "$eq" : req.body
//                 }
//             }
//         }
//     ])
//     res.json(data)

// })

module.exports = router