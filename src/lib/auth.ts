import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
  },
  plugins: [nextCookies()],
});