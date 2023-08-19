const express = require('express')
const { itemGroupModel } = require('../../model/Inventory/itemsGroup')
const router = express.Router()

//create/add item group
router.post('/api/itemgroup', async(req,res)=>{
    let data = new itemGroupModel(req.body)
    data.save()
    res.json({status : "Group Created"})
})

//get item groups
router.post('/api/getgroup',async(req,res)=>{
    const itemsGroups = await itemGroupModel.find({})
    res.json(itemsGroups)
})

module.exports = router