const mongoose = require('mongoose');
//Encryption module
const Schema = mongoose.Schema;

const freepostSchema = new Schema({
});
freepostSchema.methods = {
}
module.exports = mongoose.model( 'Freepost',freepostSchema);