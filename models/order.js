const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, 'Please enter Address'],
            maxLength: [100, 'Your address cannot exceed 100 characters']
        },
        city: {
            type: String,
            required: [true, 'Please enter City'],
            maxLength: [30, 'Your city name cannot exceed 30 characters']
        },
        phoneNo: {
            type: Number,
            required: [true, 'Please enter Phone No'],
            max: [9999999999,'Phone Number Should be of 10 digit long'],
            min: [1000000000,'Phone Number Should be of 10 digit long']
        },
        postalCode: {
            type: Number,
            required: [true, 'Please enter Postal Code'],
            max: [999999,'Postal Code Should be of 6 digit long'],
            min: [100000,'Postal Code Should be of 6 digit long']
        },
        country: {
            type: String,
            default: "India",
            required: [true, 'Please enter Country'],
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 0
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
    required: true,
        default: 0.0,
        min: 0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
        min: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
        min: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
        min: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)