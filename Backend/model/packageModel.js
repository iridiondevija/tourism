const mongoose = require('mongoose')

const packageSchema = mongoose.Schema({
    description:{
        type: String,
        required: [false, 'Please add an card description']
    },
    image:{
        type: String,
        required: [false, 'Please add an image url']
    },
    images:{
        type: Array,
        required: [false, 'Please add some images url']
    },
    price:{
        type: Number,
        required: [false, 'Please add the price']
    },
    title:{
        type:String,
        required: [false, 'Please add the title ']
    },
    location:{
        type:String,
        required: [false, 'Please add the location']
    },
    rating:{
        type:String,
        required: [false, 'Please add the location']
    },
    duration:{
        type:String,
        required: [false, 'Please add the location']
    }
})

module.exports= mongoose.model("package", packageSchema)