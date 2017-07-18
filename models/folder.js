const mongoose = require('mongoose');
const User = require('./user');
const Document = require('./document');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    foldername: String,
    type: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    partner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    parent: {type: Schema.Types.ObjectId, ref: 'Folder'},
    contents: {
        documents: [{type: Schema.Types.ObjectId, ref: 'Document'}],
        folders: [{type: Schema.Types.ObjectId, ref: 'Folder'}]
    }
});
folderSchema.methods = {
}
module.exports = mongoose.model( 'Folder',folderSchema);