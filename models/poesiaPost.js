const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const PoesiaPostSchema = new Schema({
    intro: String,
    desc: String,
    poesia: String,
    img:String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const PoesiaPost = mongoose.model('PoesiaPost', PoesiaPostSchema);

module.exports =  PoesiaPost;