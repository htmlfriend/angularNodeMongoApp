const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
  // fillter by number
  //fillter by date

  //localhost:3000/api/order?offset=2&limit=5
  const query = {
    user: req.user.id,
  };
  // start date
  if (req.query.start) {
    query.date = {
      $gte: req.query.start,
    };
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }
    query.date['$lte'] = req.query.end;
  }

  if (req.query.order) {
    query.order = +req.query.order;
  }
  try {
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit);

    res.status(200).json(orders);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function (req, res) {
  try {
    // find last user's order
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({
      date: -1,
    });
    // if first order will give number 0
    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = await new Order({
      order: maxOrder + 1,
      list: req.body.list,
      user: req.user.id,
    }).save();

    res.status(201).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};
