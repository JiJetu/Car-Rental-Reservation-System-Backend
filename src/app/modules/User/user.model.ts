import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import { UserRole } from "./user.constant";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: Object.keys(UserRole),
      required: [true, "Role is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as any;

  user.password = await bcrypt.hash(user.password, Number(config.salt_round));

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  const userExists = await User.findOne({ email });

  return userExists;
};

export const User = model<TUser, UserModel>("User", userSchema);
