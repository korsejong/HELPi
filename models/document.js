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
    path: String,
});
documentSchema.methods = {
}
documentSchema.statics = {
    privateList(user,path){
        return this.find({$and:[{owner:user},{path:path},{type:'private'}]})
    },
    publicList(user,path){
        return this.find({$and:[{owner:user},{path:path},{type:'public'}]})
    }
}
module.exports = mongoose.model( 'Document',documentSchema);