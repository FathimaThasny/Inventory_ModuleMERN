const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    customer_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customers",
        required : true
    },
    payment_date : {
        type : Date,
        required : true
    },
    invoice_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "invoices",
        required : true
    },
    payment_mode : {
        type : String,
        required : true
    },
    amount: {
        type : Number,
        required : true
    },
    status : {
        type : String
    }
})

const paymentModel = mongoose.model(
    'payments', paymentSchema
)

module.exports = paymentModel