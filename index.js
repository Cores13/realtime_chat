const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const multer = require('multer');
let fs = require('fs-extra');
const path = require('path');

dotenv.config();

app.use('/images', express.static(path.join(__dirname, 'public/images')));
// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
var imgCount =0;
const imageUpload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        // let type = req.params.type;
        let way = `./public/images`;
        fs.mkdirsSync(way);
        callback(null, `public/images`);
      },
      filename: (req, file, callback) => {
        //originalname is the uploaded file's name with extn
        callback(null, (imgCount + file.originalname));
        imgCount++;
      }
    })
  });

app.post('/api/upload', imageUpload.single('file'), (req, res)=> {
    try{
        return res.status(200).json('File uploaded successful');
    }catch(error){
        console.log(error);
    }
});

app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postsRoute);

app.listen(8800,()=>{
    console.log('Server running on port 8800');
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, ()=>{
        console.log('Database connected');
    });
});