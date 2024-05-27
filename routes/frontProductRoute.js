const express = require("express")
const multer = require("multer");
const { FrontProduct, SingleProduct } = require("../model/frontProduct");
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });


router.put('/addAdvProduct', upload.array('images', 4), async (req, res) => {
    try {
        const { name,
            description,
            color,
            type,
            bluetoothVersion,
            category,
            discount,
            price,
            stock,
            model,
            screenSize,
            charging,
            battery,
            displayType, } = req.body;
            const id = "6651956b7de08851cce262f6"
        const imagePaths = req.files.map(file => file.path);
        console.log(id)
        const newProduct = await FrontProduct.findByIdAndUpdate(id,{
            ...req.body,
            images: imagePaths
        },{new:true});
        console.log(name)

        await newProduct.save();
        res.status(201).send({
            success: true,
            message: "Products Created Successfully",
            newProduct,
          });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

router.get('/getProduct', async (req, res) => {
    try {
        const products = await FrontProduct.find({});
        res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error });
    }
});


exports.router=router