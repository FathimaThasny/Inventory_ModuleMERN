const mongoose = require('mongoose')

const vendorCreditSchema = new mongoose.Schema({
    purchase_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'purchaseorders',
        required : true,
        unique:true
    },
    credit_date : {
        type : Date,
        required : true
    },
    credit_number : {
        type : String,
        required : true
    },
    vendor_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'vendors',
        required : true
    },
    status : {
        type : String
    }
})

const vendorCreditModel = mongoose.model(
    'vendorcredits', vendorCreditSchema
)

module.exports = vendorCreditModel