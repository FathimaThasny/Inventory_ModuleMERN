const express = require('express')
const { itemModel } = require('../../model/Inventory/Items')
// const images = require('../../')
const router = express.Router()
const multer = require('multer');
const uuidv4 = require('uuid')

router.use(express.static('images'))
// const DIR = './images/'

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, '-' + fileName)
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// C:\Users\windows\Documents\FSD\INTERNSHIP\images\-crocs.jpg

//Setting storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, 'images')
    },
    filename: (req, file, cb) => {
      console.log(file)
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  // initializing multer
const upload = multer({
    storage: storage
    // fileFilter: (req, file, cb) => {
    //   checkFileType(file, cb);
    // },
  });

  const path = require("path");

// const checkFileType = function (file, cb) {
//   // Allowed file extensions
//   const fileTypes = /jpeg|jpg|png|gif|svg/;

//   // check extension names
//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

//   const mimeType = fileTypes.test(file.mimetype);

//   if (mimeType && extName) {
//     return cb(null, true);
//   } else {
//     cb("Error: You can Only Upload Images!!");
//   }
// };


//create/add items
router.post('/api/additem', upload.single('image'), async(req,res)=>{
    
    // const url = req.protocol + '://' + req.get('host')
    console.log(req.file)
    const reqItems = {
        group_id : req.body.group_id,
        item_name : req.body.item_name,
        description : req.body.description,
        unit : req.body.unit,
        dimentions : req.body.dimentions,
        weight : req.body.weight,
        manufacturer : req.body.manufacturer,
        brand : req.body.brand,
        vendor_id : req.body.vendor_id,
        preferred_vendor : req.body.preferred_vendor,
        cost_price : req.body.cost_price,
        selling_price : req.body.selling_price,
        opening_stock : req.body.opening_stock,
        reorder_point : req.body.reorder_point,
        image :  req.file.filename,
        created_At : req.body.created_At
    }
 
    let data = new itemModel(reqItems)
    data.save()
    res.send({success : data})
    // res.json({status: "Item Entered!"})
})

//get all the entered items from database
router.get('/api/viewitems', async(req,res)=>{
    let data = await itemModel.find({})
    res.json(data)
})


module.exports = router