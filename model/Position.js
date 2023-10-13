const mongoose = require('mongoose');

const positionSchema = mongoose.Schema({
     ticker:     String, 
     sharePrice: Number,
     shares:     Number,
     date:       Date
}, {
    timestamps: true,
});

module.exports = mongoose.model('Position', positionSchema);