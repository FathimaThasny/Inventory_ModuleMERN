const mongoose = require('mongoose')
const invoiceSchema = new mongoose.Schema({
    invoice_number : {
        type : String,
        required : true
    },
    invoice_date : {
        type : String,
        required : true
    },
    order_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'salesorders',
        required : true
    },
    customer_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'customers'
    },
    payment_status : {
        type : String
    }
})

const invoiceModel = mongoose.model(
    'invoices', invoiceSchema
)

module.exports = invoiceModel