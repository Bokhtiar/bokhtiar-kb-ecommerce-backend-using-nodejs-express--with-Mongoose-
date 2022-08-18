const {Schema, model} = require('mongoose')

/**field create */
const newSchema = new Schema({
    f_name: {
        type: String,
        trim: true,
        require: true,
    },
    l_name: {
        type: String,
        trim: true,
        require: true,
    },
    email: {
        type: String,
        trim: true,
        require: true,
    },
    role: {
        type: String,
        trim: true,
        default: 'admin'
    },
    image: {
        type: String,
        trim: true,
        require: false
    },
    password: {
        type: String,
        trim: true,
        require: true,
    }
}, {
    timestamps: true
})

/**table create */
const admins = model('admins', newSchema)
module.exports = admins 
