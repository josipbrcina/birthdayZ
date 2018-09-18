const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/jquery', express.static(path.join(__dirname, "/node_modules/jquery/dist/")));
app.use('/jquery-datepicker', express.static(path.join(__dirname, "/node_modules/jquery-datepicker/")));

app.post('/get-difference', (req, res) => res.send(`Well done!`));

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Available at http://localhost:3000'));
