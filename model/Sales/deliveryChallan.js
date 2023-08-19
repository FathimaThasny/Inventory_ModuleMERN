const mongoose = require('mongoose')

const deliveryChallanSchema = new mongoose.Schema({
    challan_number : {
        type : String,
        required : true
    },
    delivery_date : {
        type : Date,
        required : true
    },
    order_id : {
        type : mongoose.Schema.ObjectId,
        ref : 'salesorders'
        // required : true
    },
    customer_id : {
        type : mongoose.Schema.ObjectId,
        ref: "customers"
    },
    // customer_name : {
    //     type : String,
    //     required : true
    // },
    // customer_address : {
    //     type : String,
    //     required : true
    // },
    status : {
        type : String
    }
})

const deliveryChallanModel = mongoose.model(
    'deliveryChallans', deliveryChallanSchema
)

module.exports = deliveryChallanModel