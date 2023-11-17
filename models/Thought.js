const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction')

const thoughtSchema = new Schema (
    {
thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
},
createdAt: {
    type: Date,
    default: Date.now,
    // TO DO: use a getter method to format the timestamp on query
    // idk if this will work but let's seeeee
    get: timestamp => dateFormat(timestamp).toLocaleDateString()
},
username: {
    type: String,
    required: true,
},
reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
}
);

// reactionCount retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;