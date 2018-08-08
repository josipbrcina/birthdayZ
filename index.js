const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/hola', (req, res) => res.send(`Hello ${req.body.name}`));

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Available at http://localhost:3000'));
