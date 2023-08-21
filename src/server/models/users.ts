import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    password: String,
}, {timestamps: true})

const Users = mongoose.models.User || mongoose.model("User", userSchema);
export default Users