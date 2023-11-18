const { Schema, model } = require('mongoose');
// Create User model
const userSchema = new Schema(
{
username: {
    type: String,
    required: true,
    unique: true,
    trim: true
},
email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function (value) {
            const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            return emailRegex.test(value);
        },
        message: "Email Validation Failed!" 
    }
},
thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    },
],
friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
    
});
// friendCount retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;
