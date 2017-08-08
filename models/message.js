const mongoose = require('mongoose');
const moment = require('moment');
const User = require('./user');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    contents: String,
    deleted: { type: Boolean, default: false },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);
messageSchema.methods = {
}
messageSchema.statics = {
}
module.exports = mongoose.model( 'Message',messageSchema);