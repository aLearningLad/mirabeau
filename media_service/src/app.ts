const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { clerkMiddleware } = require("@clerk/express");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  })
);

console.log("Publishable Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("Secret Key:", process.env.CLERK_SECRET_KEY);

module.exports = app;
