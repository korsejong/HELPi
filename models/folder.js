const mongoose = require('mongoose');
const moment = require('moment');
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
    path: String,
    deleted: { type: Boolean, default: false },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);
folderSchema.methods = {
}
folderSchema.statics = {
    privateList(user,path){
        return this.find({$and:[{owner:user},{path:path},{type:'private'},{deleted:false}]}).populate('owner');
    },
    publicList(user,path){
        return this.find({$or:[{$and:[{owner:user},{path:path},{type:'public'},{deleted:false}]},{$and:[{partner:user},{path:path},{type:'public'},{deleted:false}]}]}).populate('owner');
    },
    recentList(user){
        let time = Date.now()-1000*60*60*24;
        return this.find({$and:[{owner:user},{updated_at:{$gte:time}},{deleted:false}]}).populate('owner');
    },
}
module.exports = mongoose.model( 'Folder',folderSchema);