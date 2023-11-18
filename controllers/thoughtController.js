const { Thought, User } = require('../models');

module.exports =  {
// Here is where you define your routes for Thoughts
// GET all thoughts

// GET a single thought by id 

// POST or create a new thought
// (don't forget to push the created thought's _id 
// to the associated user's thoughts array field)
async createThought(req, res) {  
      try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$push:{thoughts: thought._id}},
            {new: true}
            );
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
//  example for POST 
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }

// PUT to update a thought by id

// DELETE route to remove thought by id
};