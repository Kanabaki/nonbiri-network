const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // TO DO: use a getter method to format the timestamp on query
        // idk if this will work but let's seeeee
        get: timestamp => dateFormat(timestamp).toLocaleDateString()
    },
}
);

module.exports = reactionSchema;
