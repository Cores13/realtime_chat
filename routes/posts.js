const router = require('express').Router();
const Post = require('../Models/Post');


//Create a post
router.post('/', async (req, res) =>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(error){
        res.status(500).json(error);
    }
})

//Update a posts

//Delete a post

//Like a post

//Get a post

//Get timeline posts

module.exports = router;