const express = require('express')
const { salesOrderModel } = require('../../model/Sales/salesOrder')
const { itemModel } = require('../../model/Inventory/Items')
const router = express.Router()

//create sales order
router.post('/api/createsales', async(req,res)=>{
    try{
        console.log("api called")
        console.log(req.body)
        console.log(req.body.items)
        {req.body.items.map(async (value) => {
            console.log("item")
            console.log(value.item)
            await itemModel.updateOne({ _id : value.item} , { $set : {opening_stock : value.stock}} )
        })}
        
        
    
        console.log("after maping")
        let data = new salesOrderModel(req.body)
        console.log(data)
        // let value = new itemModel(req.body)
        data.save()    
        res.json({status : "Sales Order Created"})
    }catch(error){
        res.send(error)
        return
    }
    
})

//display all sales order
router.post('/api/displaysales', async(req,res)=>{

    let data = await salesOrderModel.aggregate([
        {
            "$lookup" : {
                "from" : "customers",
                "localField" : "customer_id",
                "foreignField" : "_id",
                "as" : "customerDetails"
            }
        },
        {
            "$lookup" : {
                "from" : "itemmodels",
                "localField" : "item",
                "foreignField" : "_id",
                "as" : "itemsDetail"
            }
        },
        {
            "$project" : {
                "order_number" : 1,
                "date" : 1,
                "customer_id" : 1,
                "customerName" : "$customerDetails.name",
                "customerEmail" : "$customerDetails.email",
                "customerAddress" : "$customerDetails.billing_address",
                "items" : 1,
                "total_price" : 1,
                "order_status" : 1
            }
        }
    ])


    // let data = await salesOrderModel.find({})
    res.json(data)
})

router.post('/api/customerorder', async(req,res) => {
    const customerId = req.body.customer_id
    console.log("cust_id", customerId)
    let data = await salesOrderModel.aggregate([
        {
            "$lookup" : {
                "from" : "customers",
                "localField" : "customer_id",
                "foreignField" : "_id",
                "as" : "customerDetails"
            }
        },
        {
            "$lookup" : {
                "from" : "itemmodels",
                "localField" : "item",
                "foreignField" : "_id",
                "as" : "itemsDetail"
            }
        },
        {
            $match : {
                "customer_id" : customerId
            }
        },
        {
            "$project" : {
                "order_number" : 1,
                "date" : 1,
                "customer_id" : 1,
                "customerName" : "$customerDetails.name",
                "customerEmail" : "$customerDetails.email",
                "customerAddress" : "$customerDetails.billing_address",
                "total_price" : 1,
                "order_status" : 1
            }
        }
    ])
    console.log(data)
    res.json(data)

})

router.post('/api/itemsfilter', async(req,res) => {
    const itemId = req.body.item_id
    console.log(itemId)
    let data = await salesOrderModel.aggregate([
        {
            "$lookup" : {
                "from" : "customers",
                "localField" : "customer_id",
                "foreignField" : "_id",
                "as" : "customerDetails"
            }
        },
        {
            "$lookup" : {
                "from" : "itemmodels",
                "localField" : "item",
                "foreignField" : "_id",
                "as" : "itemsDetail"
            }
        },
        // {
        //     $match : {
        //         "items.item" : itemId
        //     }
        // },
        {
            "$project" : {
                "order_number" : 1,
                "date" : 1,
                "customer_id" : 1,
                "customerName" : "$customerDetails.name",
                "customerEmail" : "$customerDetails.email",
                "customerAddress" : "$customerDetails.billing_address",
                "total_price" : 1,
                "order_status" : 1
            }
        }
    ])
    res.json(data)

})

//display single sales order
router.post('/api/viewsingleorder', async(req,res)=>{
    let data = await salesOrderModel.find(req.body)
    res.json(data)
})

//display sales orders on certain period
router.post('/api/salesonperiod', async(req,res)=>{
        // const start = req.body.startdate
        // const end = req.body.enddate

       let data = await salesOrderModel.aggregate(
            [
                {$lookup:{
                    from : 'customers',
                    localField : 'customer_id',
                    foreignField: '_id',
                    as : 'customer_details'
                }},
                {$lookup:{
                    from : 'itemModel',
                    localField : 'item',
                    foreignField : '_id',
                    as : 'item_details'
                }}
            ]
        )
    //   let data = salesOrderModel.find() 
      res.json(data)     
      console.log(data)
        
    
})

router.post('/api/getorder', async(req,res) => {
    const orderNumber = req.body.order_number

    let data = await salesOrderModel.aggregate([
        {
            "$lookup" : {
                "from" : "customers",
                "localField" : "customer_id",
                "foreignField" : "_id",
                "as" : "customerDetails"
            }
        },
        {
            "$lookup" : {
                "from" : "itemmodels",
                "localField" : "items.item",
                "foreignField" : "_id",
                "as" : "itemsDetail"
            }
        },
        {
            "$match" : {
                'order_number' : orderNumber
            }
        },
        {
            "$project" : {
                "order_number" : 1,
                "date" : 1,
                "customer_id" : 1,
                "customerName" : "$customerDetails.name",
                "customerEmail" : "$customerDetails.email",
                "customerAddress" : "$customerDetails.billing_address",
                // "items": 1,
                "items.item" : 1,
                "items.item_name" : 1,
                "items.quantity" : 1,
                "total_price" : 1,
                "order_status" : 1
            }
        }
    ])

    console.log(data)
    res.json(data)
})


module.exports = router