const router = require('express').Router();

router.get('/',(req, res)=>{
    res.send('display users');
});

module.exports = router;