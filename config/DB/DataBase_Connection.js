const mongoose = require('mongoose')

const dbconnect = async() => {
    try {
        await mongoose.connect(process.env.DB_URL , {
        useUnifiedTopology : true,
        useNewUrlParser : true
        }
        )
        console.log("DATABASE CONNECTED");
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbconnect;