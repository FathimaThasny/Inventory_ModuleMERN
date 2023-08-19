const mongoose = require('mongoose')

const purchaseOrderSchema = new mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    order_number : {
        type : String
    },
    vendor_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'vendors',
        required : true
    },
    items : [{
        item : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'itemModel',
            required : true
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
        },
        item_name : {
            type : String
        }
    }],
    totalAmount : {
        type : Number
    },
    status : {
        type : String
    }
})

const purchaseOrderModel = mongoose.model(
    'purchaseorders', purchaseOrderSchema
)

module.exports = purchaseOrderModel