const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // when new resource is created _id will created which is object id. So,  we want user to be object id]
        required: true,
        ref: 'User', // need to add a reference because need to know which model does this object id pertain to and it will be User model
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)