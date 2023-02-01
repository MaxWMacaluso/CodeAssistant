// File utilizes Node.js and Express.js to create the Application Server
    // Application Server facilitates requests from frontend -> backend
// Access server via http://localhost:${port}

const express = require('express');
const app = express();

// So the program can find .env file
require('dotenv').config();

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