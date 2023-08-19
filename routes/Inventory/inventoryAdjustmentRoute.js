const express = require('express')
const {inventoryAdjustmentModel} = require('../../model/Inventory/inventoryAdjustments')
const { itemModel } = require('../../model/Inventory/Items')
const router = express.Router()

//updating items/ making inventory adjustments
router.post('/api/adjustitem', async(req,res)=>{
    
    let data = new inventoryAdjustmentModel(req.body)
    data.save()
    res.json({status :"Successfully Updated"})

    //checking mode of adjustment
    if(req.body.quantity){
        await itemModel.findByIdAndUpdate(req.body.item_id, {$set : { opening_stock : req.body.quantity}})
    }
    else if(req.body.value){
        await itemModel.findByIdAndUpdate(req.body.item_id, {$set : { selling_price : req.body.value}})
    }

})


//view adjustment reports
router.post('/api/viewadjustments', async(req,res)=>{
    let data = await inventoryAdjustmentModel.aggregate(
        [
            {"$lookup":{
                "from": 'itemmodels',
                "localField":'item_id', 
                "foreignField":'_id',
                "as" : 'item_details'
            }
        },
        {
            "$project" : {
                "item_id" : 1,
                "itemName" : "$item_details.item_name",
                "mode_of_adjustment" : 1,
                "quantity" : 1,
                "value" : 1,
                "reference_number" : 1,
                "reason" : 1,
                "description" : 1,
                "date" : 1
            }
        }
        ]
    )
    res.json(data)
})


//report of specific date/dates
router.post('/api/adjustmentreport', async(req,res)=>{
    try{
        const startdate = req.body.start
        const enddate = req.body.end

        console.log(startdate,enddate)

        let data = await inventoryAdjustmentModel.aggregate(
            [
            {   "$lookup":{
                    "from": 'itemmodels',
                    "localField":'item_id', 
                    "foreignField":'_id',
                    "as" : 'item_details'
                }
            },
            {
                "$match" : {
                    "date" : {
                        "$gte" : new Date(`${startdate}`),
                        "$lte" :new Date(`${enddate}`)
                    }
                  
                    }
                },
            {
                "$project" : {
                    "item_id" : 1,
                    "itemName" : "$item_details.item_name",
                    "mode_of_adjustment" : 1,
                    "quantity" : 1,
                    "value" : 1,
                    "reference_number" : 1,
                    "reason" : 1,
                    "description" : 1,
                    "date" : 1
                }
            }
            ]
        )

        // let data = await inventoryAdjustmentModel.find({ date : {$gte : startdate, $lte : enddate}})
        console.log(data)
        res.json(data)
    }
    catch(error){
        console.log(error.message)
    }
})


module.exports = router