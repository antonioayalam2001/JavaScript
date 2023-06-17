const PORT = 8000
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config;
const app = express()
app.use(cors())
app.use(express.json())
app.post('/solve', (req, res) => {
    var options = {
        method: 'POST',
        url: 'https://sudoku-board.p.rapidapi.com/solve-board',
        params: {
            sudo: '123.674..457..9..6.96.4........587.454.791..2.7.4.2...91..7..433..91.527...32.9..',
            stype: 'list'
        },
        headers: {
            'x-rapidapi-host': 'sudoku-board.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
    });
})
app.listen(PORT,() => {
    console.log(`Server Listening on PORT: ${PORT}`);
})