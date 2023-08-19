const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    contact_number : {
        type : Number,
        required : true
    },
    billing_address : {
        type : String,
        required : true
    }
})

const customerModel = mongoose.model(
    'customers', customerSchema
)

module.exports = customerModel