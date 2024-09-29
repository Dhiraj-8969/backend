const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});
const MenuItem = mongoose.model('MenuItem', MenuSchema);
module.exports = MenuItem;