const mongoose = require('mongoose');
let dbName = 'libManage';

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/libManage',
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
            });
            console.log("Connected Successfully to the database");
    }
    catch(err){
        console.error('Failed connection to the database');
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;