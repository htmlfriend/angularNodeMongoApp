const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const authRouter = require('./routers/auth.js');
const analyticsRouter = require('./routers/analytics.js');
const categoryRouter = require('./routers/category.js');
const orderRouter = require('./routers/order.js');
const positionRouter = require('./routers/position.js');
// const keys = require('./config/keys');
const app = express();

// for production
// mongoose
//   .connect(keys.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log('mongo was connected'))
//   .catch((err) => console.log('err', err));

// for development
mongoose
  .connect('mongodb://localhost:27017/school', { useNewUrlParser: true })
  .then(() => console.log('mongo connected'))
  .catch((err) => console.log('bad connection'));

// strategy passport
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());

// where do you find images
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/position', positionRouter);

module.exports = app;
