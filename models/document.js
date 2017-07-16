const mongoose = require('mongoose');
//Encryption module
const Schema = mongoose.Schema;

const documentSchema = new Schema({
});
documentSchema.methods = {
}
module.exports = mongoose.model( 'Document',documentSchema);