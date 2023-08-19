const mongoose = require('mongoose')

const itemGroupSchema = new mongoose.Schema({
    group_label : {
        type : String,
        unique : true
    }
})

const itemGroupModel = mongoose.model(
    'item_Groups', itemGroupSchema
)

module.exports = {itemGroupModel}