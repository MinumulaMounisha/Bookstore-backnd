const express = require('express');
const router = express.Router();
const Book = require('../model/Books');
const verify = require('./verifyToken');

module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
    //res.send('Post API')
    const book = new Book({                 
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    try {
        const SaveBook = await book.save();
        res.status(200).json(SaveBook)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})


//Get all Method
router.get('/getAll', async (req, res) => {
    //res.send('Get All API')
    try{
        const Books = await Book.find();
        res.status(200).json(Books);
    }
    catch(error){
     res.status(400).json({message:error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    //res.send('Get by ID API')
    try{
        const book = await Book.findById(req.params.id);
        res.json(book);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    //res.send('Update by ID API')
    try{
        const id = req.params.id;
        const updatedBook = req.body;
        const options = {new: true} //specifies whether to return the updated data in the body or not.

        const book = await Book.findByIdAndUpdate(id, updatedBook, options )
        res.json(book);
        res.send(book)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    //res.send('Delete by ID API')
    try{
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id)
        res.json(book);
        res.send(`Document with ${book.title} has been deleted..`)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})