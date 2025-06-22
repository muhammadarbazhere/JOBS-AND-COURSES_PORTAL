const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    cart: {
        courses: [{
            course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
            quantity: { type: Number, default: 1 }
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
