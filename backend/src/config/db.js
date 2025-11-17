const mongoose = require('mongoose');

require('dotenv').config();

const dbURI = process.env.MONGO_URI;

const connectDB = ()=>{
    try{
        await.mongoose.connect(dbURI);
        console.log("HURRAY MONGODB CONNECteD SUcessfully");
    }
    catch (err){
        console.error('😭 CONNECTIOIN ERROR : ',err.message)
        process.exit(1)
    }
};
module.exports = connectDB;