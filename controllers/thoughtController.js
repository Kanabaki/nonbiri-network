const { Thought, User } = require('../models');

module.exports =  {
// GET all thoughts
async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find().select("-__v")
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
},
// GET a single thought by id 
async getOneThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')

    if (!thought) {
      return res.status(404).json({ message: 'No Thought found with that ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},
// POST or create a new thought
// (don't forget to push the created thought's _id 
// to the associated user's thoughts array field)
async createThought(req, res) {  
      try {
        const thoughts = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
// addToSet doesn't add the new item if it already contains it, but push
// adds the given item wether it exists or not
            {$push:{thoughts: thought._id}},
            {new: true}
            );
        res.json(thoughts,user);
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
async updateThought(req, res) {
  try {
    const thoughts = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thoughts) {
      return res.status(404).json({ message: 'No User found with that ID!' });
    }

    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
// {
//   "thoughtText": "Updated thought text",
//   "username": "lernantino"
// }

// DELETE route to remove thought by id
async deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No User with that ID' });
    }

    res.json({ message: 'Thought Deleted!' })
  } catch (err) {
    res.status(500).json(err);
  }
},
};