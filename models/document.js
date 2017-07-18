const mongoose = require('mongoose');
const User = require('./user');
const Folder = require('./folder');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    documentname : String,
    type : String,
    owner : {type: Schema.Types.ObjectId, ref: 'User'},
    partner : [{type: Schema.Types.ObjectId, ref: 'User'}],
    parent: {type: Schema.Types.ObjectId, ref: 'Folder'},
    contents : String
});
documentSchema.methods = {
}
module.exports = mongoose.model( 'Document',documentSchema);