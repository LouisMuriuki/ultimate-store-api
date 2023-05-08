import * as mongoose from "mongoose";
const Connect = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Connect;