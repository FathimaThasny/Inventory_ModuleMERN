const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({

    item_name : {
        type : String
    },
    unit : {
        type : String
    },
    dimentions : {
        type : String
    },
    weight : {
        type : Number
    },
    manufacturer : {
        type : String
    },
    brand : {
        type : String
    },
    selling_price : {
         type : Number
    },
    cost_price : {
        type : Number
    },
    description : {
        type : String
    },
    opening_stock : {
        type : Number
    },
    reorder_point : {
        type : Number
    },
    vendor_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'vendors',
        // required : true
    },
    preferred_vendor : {
        type : String
    },
    image : {
        type : Object
    },
    group_id : {
        type: mongoose.Schema.ObjectId,
        ref : 'item_Groups'
    },
    created_At : { 
        type: Date, 
        // required: true
    }

})

const itemModel = mongoose.model(
    "itemModel", itemSchema
)

module.exports = {itemModel}