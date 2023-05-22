import Cart from "../mongo/models/CartSchema.js";

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const allCarts = await Cart.find({});
    res.status(200).json({ success: true, data: allCarts });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const createCart = async (req, res) => {
  const newCart = req.body;
  try {
    const createdCart = await Cart.create(newCart);
    res.status(200).json({ success: true, data: createdCart });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: true, //important
      runValidators: true,
    });
    console.log(updatedCart);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ sucess: true, data: deletedCart });
  } catch (error) {
    res.status(500).json(error);
  }
};

const productStats = async (req, res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Product.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllCarts,getUserCart, createCart, updateCart, deleteCart, productStats };
