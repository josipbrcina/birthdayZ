const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/jquery', express.static(path.join(__dirname, "/node_modules/jquery/dist/")));
app.use('/jquery-datepicker', express.static(path.join(__dirname, "/node_modules/jquery-datepicker/")));

app.post('/get-difference', (req, res) => {
  if (!req.body.name || !req.body.birthdate) {
    res.status(400);
    res.send("Name and Date of Birth are required fields!");
  }

  const currentDate = moment();
  const birthdate = moment(req.body.birthdate, moment.ISO_8601);

  // Let's check birthdate input
  if (!birthdate.isValid()) {
    res.status(400);
    res.send("Invalid birthdate format!");
  }

  // Let's check if birthday date is invalid - higher than today - born in the future?
  if (birthdate.isAfter(currentDate)) {
    res.status(400);
    res.send(`Back from the future? Today is ${currentDate.format("YYYY-DD-MM")}`);
  }

  res.status(200);

  // Let's see if we have a birthday celebrant :)
  if (currentDate.diff(birthdate, 'days') === 0) {
    res.send(`Hey ${req.body.name}, your birthday is actually today! Happy birthday!`);
  }

  const personAge = currentDate.diff(birthdate, 'years');
  const nextBirthdayDate = moment(birthdate).add(personAge + 1, 'years');

  const monthsDiff = nextBirthdayDate.diff(currentDate, 'months');
  const daysDiff = nextBirthdayDate.subtract(monthsDiff, 'months').diff(currentDate, 'days');

  res.send(
  `Hey ${req.body.name}, your birthday is in ${monthsDiff} months and ${daysDiff} days!`
  );
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Available at http://localhost:3000'));
