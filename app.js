const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

require('./database/connection.js') //database connection

//items routes
const items = require('./routes/Inventory/itemsRoute.js')
const itemGroups = require('./routes/Inventory/itemGroupRoute.js')
const inventoryAdjustment = require('./routes/Inventory/inventoryAdjustmentRoute.js')

//Sales Routes
const customer = require('./routes/Sales/customerRoute.js')
const saleorder = require('./routes/Sales/salesOrderRoute.js')
const challan = require('./routes/Sales/deliveryChallanRoutes.js')
const package = require('./routes/Sales/packagesRoute.js')
const invoice = require('./routes/Sales/invoiceRoute.js')
const payments = require('./routes/Sales/paymentsRoute.js')
const salesReturn = require('./routes/Sales/salesReturnRoute.js')
const creditNote = require('./routes/Sales/creditNotesRoute.js')

//Purchase Routes
const vendor = require('./routes/Purchase/vendorRoutes.js')
const purchase = require('./routes/Purchase/purchaseOrderRoute.js')
const billpayments = require('./routes/Purchase/billpaymentsRoute.js')
const vendorcredits = require('./routes/Purchase/vendorCreditsRoute.js')

//calling apis
app.use(items)
app.use(itemGroups)
app.use(inventoryAdjustment)

app.use(customer)
app.use(saleorder)
app.use(challan)
app.use(package)
app.use(invoice)
app.use(payments)
app.use(salesReturn)
app.use(creditNote)

app.use(vendor)
app.use(purchase)
app.use(billpayments)
app.use(vendorcredits);

//server running
app.listen(5000,()=>{
    console.log("Server running at 5000")
})
