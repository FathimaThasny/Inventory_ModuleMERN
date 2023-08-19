const mongoose = require('mongoose')

const billsandPaymentSchema = new mongoose.Schema({
    bill_number : {
        type : String, 
        required : true
    },
    bill_date : {
        type : String,
        required : true
    },
    purchase_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'purchaseorders',
        required : true,
        unique : true
    },
    vendor_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'vendors',
        required : true
    },
    status : {
        type : String
    }
})

const billpaymentModel = mongoose.model(
    'billsandpayments', billsandPaymentSchema
)

module.exports = billpaymentModel