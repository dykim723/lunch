const express = require('express');
const router = express.Router();
const User = require('../src/models/Person');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await User.find();

  res.json(users);
});

router.post('/create', async (req, res) => {
  let name = req.body.name;

  const user = new User({ name: name });

  await user.save().then(() => console.log('User created'));

  res.status(200).json({});
});

module.exports = router;
