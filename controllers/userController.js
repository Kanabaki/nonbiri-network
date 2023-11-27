const { User, Thought } = require('../models');

module.exports =  {
// Here is where you define your routes for User
// GET all users
async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v")
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// GET a single user by id and populated thought and friend data
async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')


      if (!user) {
        return res.status(404).json({ message: 'No User found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// POST or create a new user
async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
//  example for POST 
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }

// PUT to update a user by id
async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No User found with that ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// a PUT will be the same as the POST as far as the input fields, but the input values
// can be changed
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }


// DELETE route to remove user by id
async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated Thoughts Deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
// FRIEND ROUTES ============================================================
async addFriend(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {$addToSet:{friends: req.params.friendId}},
        {new: true}
        );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }


  async deleteFriend(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {$pull:{friends: req.params.friendId}},
        {new: true}
        );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};