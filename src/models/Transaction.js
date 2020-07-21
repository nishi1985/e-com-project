import { Schema, model } from 'mongoose'

const TrasactionSchema = new Schema ({
    date: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
})

export default model('Transaction', TrasactionSchema)