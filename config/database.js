const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://vedant:Vedant123@shopit.o6c8dlz.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true        
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase