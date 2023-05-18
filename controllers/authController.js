import User from "../mongo/models/UserSchema.js";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    res.status(500).json({ success: false, data: "Some fields are missing" });
    return;
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.PASSSECRET
      ).toString(),
    });

    res.status(200).json({ success: true, data: newUser });
    console.log("success");
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
    });
    console.log(user);
    !user && res.status(500).json("NO such user");

    const decryptedPasword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSSECRET
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPasword !== password) {
      return res.status(500).json("Wrong credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWTSECRET,
      { expiresIn: "3d" }
    );

    // const { password, ...secureUser } = user;
    res.status(200).json({ success: true, data: {user,accessToken} });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};

export { registerUser, loginUser };
