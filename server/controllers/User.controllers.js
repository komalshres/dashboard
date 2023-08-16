import UserModel from "../model/User.model.js";
import { filterFalsyValue } from "../utils/filter-falsy-value.js";
import { validation } from "../utils/validation.js";
import bcrypt from "bcrypt";

export async function getUsers(req, res) {
  try {
    const { username, ...rest } = req.query;
    const users = await UserModel.find({}, { password: 0 });

    if (!username && Object.keys(rest).length) {
      throw new Error("Try filtering with username");
    }

    const regexQuery = new RegExp(username, "i");

    if (username) {
      const filteredUser = await UserModel.find({ username: regexQuery });
      return res.send({ data: filteredUser });
    }

    res.send({ data: users.reverse() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const { body } = req;
      const { username, email, _id } = body;

      const usernameExist = await UserModel.findOne(
        { username, _id: { $ne: _id } },
        { _id }
      );

      if (username && username.includes(" "))
        throw new Error("Username cannot contain blank space");

      if (usernameExist) {
        throw new Error("Username already been taken");
      }

      if (!username || !email)
        throw new Error("Username and email are required");

      const emailExist = await UserModel.findOne(
        { email, _id: { $ne: _id } },
        { _id }
      );

      const user = await UserModel.findOne({ _id });

      if (emailExist) {
        throw new Error("Email has already been registered");
      }

      const { __v, _id: id, password, old_password, ...rest } = body;

      validation(password && !old_password, "Old password is required");
      validation(!password && old_password, "password is required");

      const checkPassword = old_password
        ? await bcrypt.compare(old_password, user.password)
        : {};

      validation(!checkPassword, "Old Password did not match");

      validation(
        password && password.length < 6,
        "Password must be more tha 6 characters"
      );

      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

      const payload = { ...rest, password: hashedPassword };

      const finalData = filterFalsyValue(payload);

      const updatedData = await UserModel.updateOne({ _id }, finalData);

      if (!updatedData) {
        throw new Error("Invalid user");
      }
      res.send({ message: "User updated successfully", data: finalData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
