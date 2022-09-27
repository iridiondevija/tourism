const mongoose = require('mongoose')

const packageSchema = mongoose.Schema({
    description:{
        type: String,
        required: [false, 'Please add an card description']
    },
    defaultImage:{
        type: String,
        required: [false, 'Please add an image url']
    },
    carouselImages:{
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
    },
    availabilityPeriod:{
        type:Array,
        required: [false, 'Please add the location']
    }
},{timestamps: true})

module.exports= mongoose.model("tripPackages", packageSchema)