const mongoose = require("mongoose");

 const salesOrderSchema = new mongoose.Schema({
    LPO_number : {
        type : String,
        required : true
    },
    order_number : {
        type : String,
        required : true,
        unique : true
    },
    date : {
        type : Date
        // required : true
        // max : Date.now
    },
    customer_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customers',
        required : true
    },
    items : [{
        item : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'itemModel',
            required : true
        },
        item_name : {
            type : String
        },
        rate : {
            type : Number
        },
        quantity : {
            type : Number,
            required : true
        },
        price : {
            type : Number,
            required : true
        }
    }],
    total_price : {
        type : Number,
        required : true
    },
    order_status : {
        type : String,
        required : true
    },
    sales_person : {
        type : String
    }
 })

 const salesOrderModel = mongoose.model(
    'salesOrders', salesOrderSchema
 )

 module.exports = {salesOrderModel}