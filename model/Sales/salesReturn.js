const mongoose = require('mongoose')

const salesReturnSchema = new mongoose.Schema({
    order_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "salesOrders",
        required : true
    },
    return_number : {
        type : String
    },
    return_date : {
        type : Date
    },
    customer_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customers"
    },
    returned_item : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "itemModel",
        required : true
    },
    ordered_quantity : { 
        type : String,
        required : true
    },
    returned_quantity : {
        type : String,
        required : true
    },
    return_reason : {
        type : String
    },
    status : {
        type : String
    }
})

const salesReturnModel = mongoose.model(
    'salesreturns', salesReturnSchema
)

module.exports = salesReturnModel