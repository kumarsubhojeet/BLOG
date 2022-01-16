const express = require('express');
const dotenv = require('dotenv');
const dbconnect = require('./config/DB/DataBase_Connection');
const userRoute = require('./routes/UserRoute')
const {errorHandler , notFoundError} = require('./middleware/ErrorHandler')

const app = express();

const PORT = process.env.PORT || 5000
dotenv.config()


//Middleware

app.use(express.json())
dbconnect()


// Routing

app.use("/api/user" , userRoute)

// Error handlers

app.use(notFoundError)  //-> -> //this has to be call first else will return HTML error but we need it in json :)
app.use(errorHandler)


app.listen(PORT , () =>{
    console.log(`Server started at ${PORT}`);
})