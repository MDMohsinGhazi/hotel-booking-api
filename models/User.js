const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user's name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        "email is not valid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "password should at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = model("User", userSchema);
