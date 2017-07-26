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
    },
    path: String
});
folderSchema.methods = {
}
folderSchema.statics = {
    privateList(user,path){
        return this.find({$and:[{owner:user},{path:path},{type:'private'}]})
    },
    publicList(user,path){
        return this.find({$and:[{owner:user},{path:path},{type:'public'}]})
    }
}
module.exports = mongoose.model( 'Folder',folderSchema);