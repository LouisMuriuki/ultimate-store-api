import User from "../mongo/models/UserSchema.js";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv" 

dotenv.config()

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)

  if (!username || !email || !password) {
    res.status(500).json({ success: false, data: "Some fields are missing" });
    return;
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password:CryptoJS.AES.encrypt(password,process.env.PASSSECRET).toString()
    });

    res.status(200).json({ success: true, data: newUser });
    console.log("success");
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export default registerUser;
