const mongoose = require('mongoose');
const moment = require('moment');
const User = require('./user');
const Schema = mongoose.Schema;

const freepostSchema = new Schema({
    writer: { type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    contents: String,
    comments: ({
        writer: { type: Schema.Types.ObjectId, ref: 'User'},
        memo: String
    }),
    count: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false},
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model('freepost',freepostSchema);