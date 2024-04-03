const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type : String,
        required : "Email is required",
        trim: true,
        match: [/.+@.+\..+/, 'Email is invalid'],
        validate: {
            validator: async function(email) {
              const user = await this.constructor.findOne({ email });
              if(user) {
                if(this.id === user.id) {
                  return true;
                }
                return false;
              }
              return true;
            },
            message: props => 'The specified email address is already in use.'
          },
    },
    password: {
        type: String,
        required: "Password is required"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid email or password')
    }

    return user
}

userSchema.methods.generateAuthToken = function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, {expiresIn: "30d"})
    return token
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User