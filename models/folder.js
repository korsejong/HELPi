const mongoose = require('mongoose');
//Encryption module
const Schema = mongoose.Schema;

const folderSchema = new Schema({
});
folderSchema.methods = {
}
module.exports = mongoose.model( 'Folder',folderSchema);