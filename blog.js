const mongoose = require ('mongoose');
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags:{
        type: [String]
    }
},{
    timestamps: true
})

    // title: string type
    // content: mixed type (editorjs/dynamic content)
    // author: string (user’s id)
    // createdAt: date
    // updatedAt: date
    // tags: array of strings

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog; 