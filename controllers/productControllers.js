import Product from "../mongo/models/ProductSchema.js";

const getAllProducts = async (req, res) => {
  try {
    //remove some queries to be used later
    const query = { ...req.query }; //make a copy in order to be able to exclude some queries
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete query[el]);

    //adv filtering
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // do anything with this query
    const productsquery = Product.find(JSON.parse(queryStr));

    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      productsquery.sort(sortBy);
    } else {
      productsquery.sort("-createdAt");
    }

    //limitfields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      productsquery.select(fields);
    } else {
      productsquery.select("-__v");
    }

    //pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const doclength = await Product.countDocuments();
      if (skip >= doclength) {
        console.log("no such page");
      }
    }
    productsquery.skip(skip).limit(limit);

    //  executeQuery
    const allProducts = await productsquery;

    // const allProducts = await Product.find({});
    res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const createProduct = async (req, res) => {
  const newproduct = req.body;
  try {
    const createdProduct = await Product.create(newproduct);
    res.status(200).json({ success: true, data: createdProduct });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        upsert: true, //important
        runValidators: true,
      }
    );
    console.log(updatedProduct);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ sucess: true, data: deletedProduct });
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

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productStats,
};
