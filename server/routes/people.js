const express = require('express');
const router = express.Router();
const Person = require('../src/models/Person');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await Person.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', (req, res) => {
  let name = req.body.name;
  let query = { name: name };

  Person.exists(query, (err, ret) => {
    let user = null;
    let output = null;

    if (err) return res.status(500).json({ error: err });

    if (!ret) {
      user = new Person(query);
      user.save().then(() => console.log('User created'));
      output = `${name}`;
      res.status(200).json({ output });
    } else {
      output = `${name}`;
      res.status(204).end();
    }
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  Person.deleteOne({ _id: id }, (err, output) => {
    if (err) return res.status(500).json({ error: 'DB Failure' });

    if (!output.n) {
      return res.status(404).json({ error: `${id} is not valid ID` });
    }

    res.status(204).end();
  });
});

module.exports = router;
