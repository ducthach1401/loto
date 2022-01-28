const mongoose = require('mongoose');

const IRoom = mongoose.Schema({
    _id:{type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId},
    name: {type: String, require: true, unique: true},
    people: [{
        name: {type: String, unique: true, require: true},
        point: {type: Number, default: 0},
        active: {type: Date},
        lottery: [Number],
        ready: {type: Boolean, default: false},
        win: {type: Boolean, default: false}
    }],
    number: [Number],
    numberLoto: [Number],
    host: {type: String}
});


const Room = mongoose.model('Room', IRoom);
module.exports.Room = Room;