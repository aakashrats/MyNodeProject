
const Order = require("../../../models/order");
const order = require("../../../models/order");//

function orderController() {
  return {
    async index(req, res) {
      try {
        const orders = await Order.find({ status: { $ne: 'completed' } },null)//

          .sort({ createdAt: -1 })
          .populate('customerId', '-password')
          .exec();

        if (req.xhr) {
          //console.log(orders);
          return res.json(orders);

        } else {
          res.render('admin/orders', { orders });
         // return res.render('admin/orders')
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
}

module.exports = orderController;

