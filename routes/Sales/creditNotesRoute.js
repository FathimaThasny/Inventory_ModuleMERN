const express = require('express')
const creditnoteModel = require('../../model/Sales/creditNotesModel')
const salesReturnModel = require('../../model/Sales/salesReturn')
const router = express.Router()

//creating credit notes
router.post('/api/newcreditnote', async(req,res)=>{
    let data = new creditnoteModel(req.body)
    data.save()
    res.json({status : 'New credit note added!'})
    const returns = await salesReturnModel.findByIdAndUpdate({'_id' : req.body.salesreturn_id} , {$set : { status : req.body.status}})
})

//display credit notes
router.post('/api/viewcreditnotes', async(req,res)=>{
    let data = await creditnoteModel.aggregate([
        {
            "$lookup" : {
                "from" : "salesreturns",
                "localField" : "salesreturn_id",
                "foreignField" : "_id",
                "as" : "ReturnsData"
            }
        },
        {
            "$project" : {
                "creditnote_number" : 1,
                "creditnote_date" : 1,
                "salesreturn_id" : 1,
                "orderId" : "$ReturnsData.order_id",
                "orderNumber" : "$ReturnsData.return_number",
                "ItemId" : "$ReturnsData.returned_item",
                "Quantity" : "$ReturnsData.returned_quantity",
                "amount_to_return" : 1
            }
        }
    ])
    res.json(data)
})

module.exports = router