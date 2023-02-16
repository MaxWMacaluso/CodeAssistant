// File utilizes Node.js and Express.js to create the Application Server
    // Application Server facilitates requests from frontend -> backend
// Access server via http://localhost:${port}

const express = require('express');
const respRoute = require('./routes/response')

// To pass `Access-Control-Allow-Origin` error
const cors = require('cors');

// So the program can find .env file
require('dotenv').config();

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
// The express.json method allows Express to read data sent using a POST or PUT request
// It is used for recognizing incoming objects as JSON objects
app.use(express.json({ extended: false }));

// Use defined route
app.use('/response', respRoute)

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));