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

freepostSchema.methods = {
    getCreated() {
        return moment( this.created_at ).format('YYYY-MM-DD, hh:mm:ss a');
    }
}

freepostSchema.statics = {
    list(option) {
        let page = option.page || 0;
        let limit = option.limit || 3;
        let sort = option.sort || '-created_at';
        return this.find({deleted:false}).sort(sort).limit(limit).skip(limit*page).populate('writer');
    },
    allCount(){
        return this.find({deleted:false}).count();
    }
}

module.exports = mongoose.model('freepost',freepostSchema);