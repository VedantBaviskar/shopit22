const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://sandesh2411:sandesh2411@shopitcluster.zsh3gq0.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true        
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase