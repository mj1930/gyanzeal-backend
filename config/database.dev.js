let mongoose = require('mongoose');
mongoose.connect(
    process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

let db = mongoose.connection;
db.on('open', console.error.bind(console, 'Data base connection is open :', new Date()));
db.on('error', console.error.bind(console, 'Error in connecting with database on :', new Date()));
db.on('connected', console.error.bind(console, 'Data base connected successfully on :', new Date()));
db.on('disconnected', console.error.bind(console, 'Data base disconnected successfully:', new Date()));

module.exports = mongoose;