const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/auth')

//Require model
const Item = require('../../models/Item')

//ROUTES

//@route POST api/items
//@desc  Post one item
//@acces public
router.post('/', authentication, (req, res) => {

    const newItem = new Item({ name: req.body.name, price: req.body.price });

    newItem.save().then(item => res.json(item));
    
})

//@route GET api/items
//@desc  Get all items
//@acces public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then( items => res.json(items) )
})

//@route DELETE api/items
//@desc  Delete one item
//@acces public
router.delete('/:id', authentication, (req, res) => {
    Item.findById(req.params.id)
        .then( item => item.remove()
                            .then( () => res.json({delete: "item deleted succefully"})))
        .catch( error => res.status(404).json({
                msg: "ID doesn't exist",
                status: "404" }))
})

module.exports = router; 