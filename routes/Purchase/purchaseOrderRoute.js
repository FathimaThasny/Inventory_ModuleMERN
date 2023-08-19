const express = require('express')
const purchaseOrderModel = require('../../model/Purchase/purchaseOrderModel')
const { itemModel } = require('../../model/Inventory/Items')
const router = express.Router()

//create Purchase Order
router.post('/api/neworder', async(req,res)=>{
    console.log(req.body)
    let data = new purchaseOrderModel(req.body)
    data.save()
    res.json({status : 'New Purchase Order Created!'})
    {req.body.items.map(async (value) => {
        console.log("item")
        console.log(value.item)
        const itemsUpdate = await itemModel.find({ _id : value.item })
        if (itemsUpdate.length > 0) {
            const item = itemsUpdate[0];
            item.opening_stock = Number(item.opening_stock) + Number(value.quantity);
            item.created_At = new Date()
            // const item_id = value.item
            // console.log(item_id)
            await item.save();
        }
        // const updateItemsDate = await itemsModel.findByIdAndUpdate({ _id: req.body.item_id }, { $set: { created_At: new Date() } })

        // await itemModel.updateOne({ _id : value.item} , { $set : {opening_stock : Number(opening_stock + value.quantity)}} )
    })}
})

//diaplay all purchase orders
router.post("/api/orders", async(req,res)=>{
    let data = await purchaseOrderModel.aggregate([
        {
            "$lookup" : {
                "from" : "vendors",
                "localField" : "vendor_id",
                "foreignField" : "_id",
                "as" : "vendorData"
            }
        },
        {
            "$lookup" : {
                "from" : "itemmodels",
                "localField" : "items.item",
                "foreignField" : "_id",
                "as" : "itemData"
            }
        },
        {
            "$project" : {
                "date" : 1,
                "order_number" : 1,
                "vendor_id" : 1,
                "vendorName" : "$vendorData.name",
                "vendorMail" : "$vendorData.email",
                "vendorAddress" : "$vendorData.adress",
                "items" : 1,
                "totalAmount" :1,
                "status" : 1
            }
        }
    ])
    res.json(data)
})

//display purchase order vendor vise
router.post('/api/vendororders', async(req,res)=>{
    let data = await purchaseOrderModel.find({'vendor_id': req.body.vendor_id})
    res.json(data)
})

//display purchase order item vise
router.post('/api/orders', async(req,res)=>{
    let data = await purchaseOrderModel.find({'item': req.body.item_id})
    res.json(data)
})

module.exports = router