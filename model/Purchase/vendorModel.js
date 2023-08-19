const mongoose = require('mongoose')

const vendorschema = new mongoose.Schema({
    name: {
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
    adress : {
        type : String,
        required : true
    }
})

const vendorModel = mongoose.model(
    'vendors', vendorschema
)

module.exports = vendorModel