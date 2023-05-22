import Order from "../mongo/models/OrderSchema.js";

const getUserOrder = async (req, res) => {
  try {
    const userOrder = await Order.find({ userId: req.params.id });
    res.status(200).json({ success: true, data: userOrder });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({});
    res.status(200).json({ success: true, data: allOrders });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const createOrder = async (req, res) => {
  const newOrder = req.body;
  try {
    const createdOrder = await Order.create(newOrder);
    res.status(200).json({ success: true, data: createdOrder });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        upsert: true, //important
        runValidators: true,
      }
    );
    console.log(updatedOrder);
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ sucess: true, data: deletedOrder });
  } catch (error) {
    res.status(500).json(error);
  }
};

const monthlyOrderStats = async (req, res) => {
  const date = new Date();
  const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousmonth = new Date(date.setMonth(lastmonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousmonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({ success: true, data: income });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getAllOrders,
  getUserOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  monthlyOrderStats,
};
