const User = require('../Models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//Update user
router.put('/:id', async (req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(error){
                return res.status(500).json(error);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body,});
            res.status(200).json('Account has been updated');
        }catch(error){
            res.status(500).json(error);
        }
    }else{
        return res.status(403).json('You can update only your account!');
    }
});
//Delete user
router.delete('/:id', async (req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted');
        }catch(error){
            res.status(500).json(error);
        }
    }else{
        return res.status(403).json('You can delete only your account!');
    }
});
//Get a user

//Follow a user

//Unfollow a user

module.exports = router;