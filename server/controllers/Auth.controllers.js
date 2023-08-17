import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    if (!username || !password || !email) {
      const missingKeys = [];
      if (!username) missingKeys.push("Username");
      if (!password) missingKeys.push("Password");
      if (!email) missingKeys.push("Email");

      throw new Error(
        `${missingKeys.join(", ")} ${
          missingKeys.length > 1 ? "are" : "is"
        } required`
      );
    }

    if (username.includes(" "))
      throw new Error("Username cannot contain blank space");

    const hashedPassword = await bcrypt.hash(password, 10);

    const usernameExist = await UserModel.findOne({ username });

    if (usernameExist) {
      throw new Error("Username already been taken");
    }

    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      throw new Error("Email has already been registered");
    }

    if (password.length < 6) {
      throw new Error("Password must be more than 6 characters");
    }

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    res.status(201).send({ message: "User created successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    if (req.method === "POST") {
      const { email, password, ...rest } = req.body;
      if (Object.keys(rest).length) {
        throw new Error("Invalid key");
      }

      if (!email || !password) {
        const missingKeys = [];
        if (!email) missingKeys.push("Email");
        if (!password) missingKeys.push("Password");

        throw new Error(
          `${missingKeys.join(", ")} ${
            missingKeys.length > 1 ? "are" : "is"
          } required`
        );
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error("Invalid Email");
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        throw new Error("Invalid Password");
      }

      const token = jwt.sign(
        {
          userId: user._id,
          username: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res
        .status(200)
        .json({ message: "User logged in successfully", email, token });
    } else if (req.method === "GET") {
      const { username } = req.params;

      const findUser = await UserModel.findOne({ username });

      if (!findUser) {
        throw new Error("User not found");
      }

      res.status(200).send({
        message: "User found",
        username: findUser.username,
        profile: findUser.profile,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    const { username } = req.user;

    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...rest } = Object.assign({}, user.toJSON());

    res.status(200).send({ data: rest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
