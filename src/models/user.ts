import { Schema, model } from "mongoose";

const users = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, unique: true },
    description: { type: String, required: true, trim: true, default: "Hi, I'm normal person and I love technology, programming and sports." },
    avatar: { type: String, required: true, default: '/images/default.png' },
    socialLinks: {
      linkWsp: { type: String, required: true, default: 'http://web.whatsapp.com' },
      linkFb: { type: String, required: true, default: 'http://facebook.com' },
      linkGit: { type: String, required: true, default: 'https://github.com'}
    }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default model("users", users);
