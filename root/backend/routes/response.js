// File that defines the ___ route. Queries API and returns response
// Route: Section of code that associates an HTTP verb (GET, POST, PUT, DELETE), a URL path, and a function that is called to handle that pattern

const express = require('express');
const OpenAI = require('../apis/openai')
const router = express.Router();

// @route GET response/test
// @description response route
// @access Public
router.get('/test', (req, res) => res.send('Response route testing!'));

// @route GET response
// @description Test base response route
// @access Public
// router.get('/', (req, res) => res.send('Hello World - Route: Response'));

// @route GET response/:id
// @description Get single book by id
// @access Public
// router.get('/:id', (req, res) => {
//   Book.findById(req.params.id)
//     .then(book => res.json(book))
//     .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
// });

// TODO: Delete
// @route POST response
// @description add/save book
// @access Public
// router.post('/', (req, res) => {
//   Book.create(req.body)
//     .then(book => res.json({ msg: 'Book added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
// });

// @route POST response
// @description query OpenAI API
// @access Public
router.get('/', async (req, res) => {
  // TODO: Set query based off req.body
  try {
    var test = new OpenAI('Python', '1', '2');
    test.formQueryFromInputs();
    await test.makeOpenAICall();
    res.send(test.response);
  } 
  catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
});

// @route PUT response/:id
// @description Update book
// @access Public
// router.put('/:id', (req, res) => {
//   Book.findByIdAndUpdate(req.params.id, req.body)
//     .then(book => res.json({ msg: 'Updated successfully' }))
//     .catch(err =>
//       res.status(400).json({ error: 'Unable to update the Database' })
//     );
// });

// @route DELETE response/:id
// @description Delete book by id
// @access Public
// router.delete('/:id', (req, res) => {
//   Book.findByIdAndRemove(req.params.id, req.body)
//     .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'No such a book' }));
// });

module.exports = router;