const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors'); 
app.use(cors());

const axios = require('axios');

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    // store the events received in memory
    events.push(event);

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);

    res.send({status: 'ok event rec. and forwarded'});
});

// store the events received and return the events list when a get request is received
app.get('/events', (req, res) => {
  console.log(events);
  res.send(events);
});

app.listen(4005, () => {
    console.log('Listening to 4005');
});