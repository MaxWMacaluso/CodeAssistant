// File utilizes Node.js and Express.js to create the application server 
// Access via https://localhost:3001

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Test route
// TODO: Delete
app.get('/api/games', (req, res) => {
    res.send(['Mario', 'Zelda', 'Donkey Kong']);
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));