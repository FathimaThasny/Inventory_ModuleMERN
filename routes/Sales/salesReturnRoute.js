const express = require('express')
const salesReturnModel = require('../../model/Sales/salesReturn')
const { salesOrderModel } = require('../../model/Sales/salesOrder')
const { itemModel } = require('../../model/Inventory/Items')
const router = express.Router()

//create salesReturn
router.post('/api/addsalesreturn', async(req,res)=>{
    let data = new salesReturnModel(req.body)
    data.save()
    res.json({status : 'Sales Return Added!'})
    const salesOrders = await salesOrderModel.findOneAndUpdate({ _id: req.body.order_id }, { $set: { order_status: "Return in Progress" } })

})

router.post('/api/updatereturns', async(req, res) => {
    const itemsUpdate = await itemModel.find({ _id : req.body.item })
    if (itemsUpdate.length > 0) {
        const item = itemsUpdate[0];
        item.opening_stock = Number(item.opening_stock) + Number(req.body.quantity);
        await item.save();
    }
    let data = await salesReturnModel.findByIdAndUpdate({'_id' : req.body.id}, {$set : { status : req.body.status}})
    res.json({status : "Item Added to Inventory"})
})

//display sales Returns
router.post('/api/viewreturns', async(req,res)=>{
    let data = await salesReturnModel.aggregate([
        {
            "$lookup" : {
                "from" : "itemmodels",
                "localField" : "returned_item",
                "foreignField" : "_id",
                "as" : "ItemData"
            }
        },
        {
            "$lookup" : {
                "from" : "customers",
                "localField" : "customer_id",
                "foreignField" : "_id",
                "as" : "customerData"
            }
        },
        {
            "$lookup" : {
                "from" : "salesorders",
                "localField" : "order_id",
                "foreignField" : "_id",
                "as" : "orderData"
            }
        },
        {
            "$project": {
                "order_id" : 1,
                "return_date" : 1,
                "orderNumber" : "$orderData.order_number",
                "return_number" : 1,
                "returned_item" : 1,
                "customer_id" : 1,
                "customerName" : "$customerData.name",
                "itemName" : "$ItemData.item_name",
                "itemRate" : "$ItemData.selling_price",
                "ordered_quantity" : 1,
                "returned_quantity" : 1,
                "return_reason" : 1,
                "status" : 1
            }
        }
    ])
    res.json(data)
})

module.exports = router