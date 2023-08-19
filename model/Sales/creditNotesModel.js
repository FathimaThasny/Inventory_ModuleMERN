const mongoose = require('mongoose')

const creditNotesSchema =new mongoose.Schema({
    creditnote_number : {
        type : String,
        required : true
    },
    creditnote_date : {
        type: Date,
        required : true
    },
    salesreturn_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'salesreturns',
        required : true
    },
    amount_to_return : {
        type : Number
    }
})

const creditnoteModel = mongoose.model(
    'creditnotes', creditNotesSchema
)

module.exports = creditnoteModel