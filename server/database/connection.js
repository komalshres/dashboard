import mongoose from "mongoose";

async function connect() {
  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(process.env.MONGO_DB_URI);
  console.log("Database Connected");
  return db;
}

export default connect;
