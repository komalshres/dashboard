import jwt from "jsonwebtoken";

/** auth middleware */
export default async function Auth(req, res, next) {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // retrive the user details fo the logged in user
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Authentication Failed!" });
  }
}
