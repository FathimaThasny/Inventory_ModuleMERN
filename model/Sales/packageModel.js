const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    package_number :{
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    customer_id : {
        type : mongoose.Schema.ObjectId,
        ref : "customers",
        required : true
    },
    items : [{
        item : {
            type : mongoose.Schema.ObjectId,
            ref : "itemModel",
            required : true
        },
        item_name : {
            type : String
        },
        quantity : {
            type : Number,
            required :true
        }
    }],
    order_id : {
        type : mongoose.Schema.ObjectId,
        ref : "salesorders"
    },
    status : { 
        type : String,
        required : true
    }
})

const packageModel = mongoose.model(
    "packages", packageSchema
)

module.exports = packageModel