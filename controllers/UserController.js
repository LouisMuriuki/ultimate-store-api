import User from "../mongo/models/UserSchema.js";

const getUsers = async (req, res) => {
  try {
    //remove some queries to be used later
    const query = { ...req.query }; //make a copy in order to be able to exclude some queries
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete query[el]);

    //adv filtering
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // do anything with this query
    const usersquery = User.find(JSON.parse(queryStr));

    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      usersquery.sort(sortBy);
    } else {
      somequery = somequery.sort("-createdAt");
    }

    //limitfields

    if (res.query.fields) {
      const fileds = req.query.fileds.split(",").join(" ");
      usersquery.select(fileds);
    } else {
      usersquery.select("-__v");
    }

    //pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const doclength = await User.countDocuments();
      if (skip >= doclength) {
        console.log("no such page");
      }
    }
    usersquery.skip(skip).limit(limit); 

    //  executeQuery
    const users = await usersquery;
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};


export {getUsers}