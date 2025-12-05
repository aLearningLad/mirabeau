import { Request, Response } from "express";
const { getAuth } = require("@clerk/express");
const app = require("./app");

const PORT = process.env.PORT;

app.post("/api/v1/upload", async (req: Request, res: Response) => {
  const auth = getAuth(req);
  const token = req.headers.authorization?.split(" ")[1];

  console.log("My token is here: ", token);

  if (auth) {
    console.log("auth here: ", auth);
    return res.status(201).json({ message: "Image recieved, good sir!" });
  }

  return res
    .status(401)
    .json({ message: "User not authorized to perform this action" });
});

app.listen(PORT, () => {
  console.log(`Server is up & listening here: http://localhost:${PORT}`);
});
