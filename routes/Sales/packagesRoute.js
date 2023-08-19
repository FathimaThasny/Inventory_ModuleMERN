const express = require('express')
const packageModel = require('../../model/Sales/packageModel')
const { salesOrderModel } = require('../../model/Sales/salesOrder')
const router = express.Router()


//adding packages
router.post('/api/newpackages', async(req,res)=>{
    let data = new packageModel(req.body)
    data.save()
    res.json({status : 'New Package Added!'})

    const salesorderStatus = await salesOrderModel.findByIdAndUpdate({'_id': req.body.order_id},{$set:{order_status : req.body.status}})
})

//display all packages
router.post("/api/allPackages",async (req,res)=>{
    let data = await packageModel.aggregate([
        {
            "$lookup" : {
                "from" : "customers",
                "localField": "customer_id",
                "foreignField":"_id",
                "as" :"custData"
            }
        },
        {
            "$lookup" : {
                "from" : "itemmodels",
                "localField": "items.item",
                "foreignField":"_id",
                "as" :"itemData"
            }
        },
        {
            "$project" : {
                "package_number" : 1,
                "date" : 1,
                "customer_id" : 1,
                "customerName" : "$custData.name",
                "customerAddres" : "$custData.billing_address",
                "items.item" : 1,
                "items.item_name" : 1,
                "items.quantity" : 1,
                "order_id" : 1,
                "status" : 1
            }
        }
    ])
    // console.log(data)
    res.json(data)
})

//display packages of a customer
router.post('/api/viewapackage', async(req,res)=>{
   
        cust_id = req.body.customer_id
        console.log(cust_id)
    // let package = await packageModel.find({customer_id : cust_id})
    // console.log(package)
    // res.json(data)
 
    let data = await packageModel.aggregate([
        {
            "$lookup" : {
                "from" : "customers",
                "localField": "customer_id",
                "foreignField":"_id",
                "as" :"custData"
            }
        },
        {
            "$lookup" : {
                "from" : "itemmodels",
                "localField": "items.item",
                "foreignField":"_id",
                "as" :"itemData"
            }
        },
        {
                "$match" : {
                    'customer_id' : cust_id
                }
        },
        {
            "$project" : {
                "package_number" : 1,
                "date" : 1,
                "customer_id" : 1,
                "customerName" : "$custData.name",
                "customerAddres" : "$custData.billing_address",
                "items.item" : 1,
                "items.item_name" : 1,
                "items.quantity" : 1,
                "order_id" : 1,
                "status" : 1
            }
        }
        // },
        // 
    ])

    console.log("pipeline")
    // const data = await packageModel.aggregate(pipeline)
    console.log(data)
    res.json(data)
   
})

module.exports = router