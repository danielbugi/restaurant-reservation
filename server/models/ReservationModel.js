const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'You must provide a name'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number must be provided'],
    },
    date: {
      type: Date,
      // required: true,
      validate: {
        validator: function (value) {
          const currentDate = new Date().setHours(0, 0, 0, 0);
          const reservationDate = value.setHours(0, 0, 0, 0);
          return reservationDate >= currentDate;
        },
        message: 'Date must be today or in the future.',
      },
    },
    time: {
      type: String,
      required: [true, 'Time is required.'],
      validate: {
        validator: function (value) {
          const regex = /^(1[2-9]|2[0-1]):[0-5][0-9]$/;
          return regex.test(value);
        },
        message: 'Time must be between 12:00 and 22:00.',
      },
    },
    people: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReservationModel = mongoose.model('Reservation', reservationSchema);

module.exports = ReservationModel;
