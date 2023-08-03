const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const Reservation = require('./models/ReservationModel');
const User = require('./models/UserModel');

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'https://splendid-paprenjak-6c0360.netlify.app/',
  })
);
app.use(cookieParser());

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB).then(console.log('connected successfully to database'));

app.post('/reservation', async (req, res) => {
  const data = req.body;
  try {
    const newReservation = await Reservation.create(data);

    res.status(200).json({
      status: 'success',
      newReservation,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err,
    });
  }
});

app.get('/reservation', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: reservations,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err,
    });
  }
});

const createAdmin = async () => {
  User.create({
    username: 'admin',
    password: 'test1234',
  });
};
// createAdmin();

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json('Please provide username and password');
  }
  const user = await User.findOne({ username });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json('Incorrect username or password');
  } else {
    jwt.sign(
      { id: user._id, username },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          status: 'success',
          message: `user: ${user._id} has logged in`,
          username: user.username,
          id: user._id,
        });
      }
    );
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
