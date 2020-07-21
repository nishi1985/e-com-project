import { Schema, model } from 'mongoose'

const ProductSchema = new Schema ({
    thumbnail: String,
    description: String,
    price: Number,
    status: Boolean,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
})

ProductSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3030/files/${this.thumbnail}`
})

export default model('Product', ProductSchema)