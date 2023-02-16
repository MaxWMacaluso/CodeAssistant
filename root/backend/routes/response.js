// File that defines the response route. Queries API and returns response
// Route: Section of code that associates an HTTP verb (GET, POST, PUT, DELETE), a URL path, and a function that is called to handle that pattern

const express = require('express');
const OpenAI = require('../apis/openai')

const router = express.Router();

// @route GET response/test
// @description response route
// @access Public
router.get('/test', (req, res) => res.send('Response route working!'));

// @route POST response
// @description query OpenAI API
// @access Public
router.post('/', async (req, res) => {
  try {
    let data = req.body;
    const obj = new OpenAI(data.language, data.level, data.code);
    await obj.makeOpenAICall();
    
    res.send(obj.response);
  } 
  catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;

////////////////////////////////////
////////// EXAMPLE ROUTES //////////
////////////////////////////////////

// GET EXAMPLE
// router.get('/', (req, res) => res.send('Hello World - Route: Response'));

// GET EXAMPLE WITH REQUEST PARAMETERS response/:id
// router.get('/:id', (req, res) => {
//   Book.findById(req.params.id)
//     .then(book => res.json(book))
//     .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
// });

// POST EXAMPLE
// router.post('/', (req, res) => {
//   Book.create(req.body)
//     .then(book => res.json({ msg: 'Book added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
// });

// PUT EXAMPLE WITH REQUEST PARAMETERS response/:id
// router.put('/:id', (req, res) => {
//   Book.findByIdAndUpdate(req.params.id, req.body)
//     .then(book => res.json({ msg: 'Updated successfully' }))
//     .catch(err =>
//       res.status(400).json({ error: 'Unable to update the Database' })
//     );
// });

// DELETE EXAMPLE WITH REQUEST PARAMETERS response/:id
// router.delete('/:id', (req, res) => {
//   Book.findByIdAndRemove(req.params.id, req.body)
//     .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'No such a book' }));
// });