const express = require('express');
const router = express.Router();
const User = require('../src/models/Person');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await User.find();

  res.json(users);
});

router.post('/', async (req, res) => {
  let name = req.body.name;
  let query = { name: name };

  User.exists(query, function(err, ret) {
    let user = null;
    let output = null;

    if (err) return res.status(500).json({ error: err });

    if (!ret) {
      user = new User(query);
      user.save().then(() => console.log('User created'));
      output = `Created ${name}`;
      res.status(200).json({ output });
    } else {
      output = `${name}`;
      res.status(204).json(output);
    }
  });
});

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  // let name = req.body.name;

  console.log(id);

  User.deleteOne({ _id: id }, function(err, output) {
    if (err) return res.status(500).json({ error: 'DB Failure' });

    console.log(output);
    if (!output.n) {
      return res.status(404).json({ error: `${id} is not valid ID` });
    }

    res.status(204).end();
  });
  // const user = new User({ name: name });

  // await user.save().then(() => console.log('User created'));

  // res.status(200).json({ id: id });
});

module.exports = router;
