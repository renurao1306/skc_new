const express = require('express');
const router = express.Router();
const endproductController = require('./../controller/endproductController.js');
const multer = require("multer");
const subproductSchema = require("../../models/subproductModel");
const EndproductModel = require("../../models/endproductModel");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/endproduct')
    }, filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({storage: storage})
/*
 * GET
 */
router.get('/', endproductController.list);

/*
 * GET
 */
router.get('/:id', endproductController.show);

/*
 * POST
 */
// router.post('/', endproductController.create);
router.post('/new', upload.single('endproduct'), async function (req, res, next) {
    const endproduct = new EndproductModel({
        name: req.body.name,
        image: req.file.filename,
        info: req.body.info,
        partner: req.body.partner,
        category: req.body.category,
        Highlights: req.body.Highlights
    });
    try {
        await EndproductModel.create(endproduct);
        return res.status(201).json(endproduct)
    } catch (e) {
        return res.status(400).json({"message": "Error" + e})

    }

    // req.body contains the text fields
})
/*
 * PUT
 */
// router.put('/:id', endproductController.update);
router.put('/:id', upload.single('endproduct'), async function (req, res, next) {
    const id = req.params.id;
    const endproduct = await EndproductModel.findOne({_id: id}).exec()
    if (endproduct != null) {
        // update
        endproduct.name = req.body.name ? req.body.name : endproduct.name;
        if (req.file != null) {
            endproduct.image = req.file.filename ? req.file.filename : endproduct.image;
        }
        endproduct.info = req.body.info ? req.body.info : endproduct.info;
        endproduct.category = req.body.category ? req.body.category : endproduct.category;
        endproduct.partner = req.body.partner ? req.body.partner : endproduct.partner;
        endproduct.Highlights = req.body.Highlights ? req.body.Highlights : endproduct.Highlights;
        await EndproductModel.updateOne({_id: id}, endproduct).exec()
        return res.json(endproduct);
    } else {
        // create
        return res.status(400).json({"message": "Error"})

    }

    // req.body contains the text fields
})
/*
 * DELETE
 */
router.delete('/:id', endproductController.remove);

module.exports = router;
