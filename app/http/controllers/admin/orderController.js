
const Order = require("../../../models/order");

function orderController() {
  return {
    async index(req, res) {
      try {
        const orders = await Order.find({ status: { $ne: 'completed' } })
          .sort({ createdAt: -1 })
          .populate('customerId', '-password')
          .exec();

        if (req.xhr) {
          return res.json(orders);
        } else {
          res.render('admin/orders', { orders });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
}

module.exports = orderController;

