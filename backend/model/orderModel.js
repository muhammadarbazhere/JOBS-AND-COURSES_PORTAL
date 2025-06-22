const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // pending, completed, failed
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
