require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

const dbURI = process.env.DB_CONNECTION;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.get('/', (req,res) => {
    res.json('hi')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})