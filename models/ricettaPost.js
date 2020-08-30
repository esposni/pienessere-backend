const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const RicettaPostSchema = new Schema({
    title: String,
    desc: String,
    ricetta: String,
    img:String,
    preparazione:String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const RicettaPost = mongoose.model('RicettaPost', RicettaPostSchema);

module.exports =  RicettaPost;