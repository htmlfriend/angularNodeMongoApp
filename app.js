const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./routers/auth.js');
const analyticsRouter = require('./routers/analytics.js');
const categoryRouter = require('./routers/category.js');
const orderRouter = require('./routers/order.js');
const positionRouter = require('./routers/position.js');
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/position', positionRouter);

module.exports = app;
