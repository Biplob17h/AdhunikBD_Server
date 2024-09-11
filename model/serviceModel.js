import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    categorySlug : {
        type : String,
        required : true
    },
    subCategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SubCategory'
    }
})

const Service = mongoose.model('Service', serviceSchema)

export default Service