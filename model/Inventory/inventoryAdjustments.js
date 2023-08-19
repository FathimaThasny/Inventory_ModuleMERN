const mongoose = require('mongoose')

const inventoryAdjustmentsSchema = new mongoose.Schema({
    item_id : {
        type : mongoose.Schema.ObjectId,
        ref : "itemModel",
        required : true
    },
    mode_of_adjustment : {
        type : String,
        required : true
    },
    quantity : {
        type : String
    },
    value : {
        type : String
    },
    reference_number : {
        type : String
    },
    reason : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    file : {
        type : String
    },
    date : {
        type : Date
    }
})

const inventoryAdjustmentModel = mongoose.model(
    "inventory_adjustments", inventoryAdjustmentsSchema
)

module.exports = {inventoryAdjustmentModel}