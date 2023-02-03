// File utilizes Node.js and Express.js to create the Application Server
    // Application Server facilitates requests from frontend -> backend
// Access server via http://localhost:${port}

const express = require('express');
const respRoute = require('./routes/response')

// So the program can find .env file
require('dotenv').config();

const app = express();

// TODO: Update route
app.use(respRoute)

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));