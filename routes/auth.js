const router = require('express').Router();

router.get('/',(req, res)=>{
    res.send('display auth');
});

module.exports = router;