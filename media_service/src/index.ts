import { Request, Response } from "express";
const { getAuth } = require("@clerk/express");
const app = require("./app");
const multer = require("multer");
const upload = multer({ dest: "/images" });

const PORT = process.env.PORT;

// upload image
app.post(
  "/api/v1/upload",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const auth = getAuth(req);
    const token = req.headers.authorization?.split(" ")[1];

    try {
      // show form data
      console.log("file data here: ", req.file);
    } catch (error) {
      console.error("Error here: ", error);
    }

    // if (auth) {
    //   // console.log("auth here: ", auth);
    //   return res.status(201).json({ message: "Image recieved, good sir!" });
    // }

    // return res
    //   .status(401)
    //   .json({ message: "User not authorized to perform this action" });
  }
);

// dummy data for pagination
const dummies = [
  "Aiden Brooks",
  "Lena Carter",
  "Miles Donovan",
  "Sophie Ray",
  "Jaxon Hale",
  "Aria Monroe",
  "Leo Santos",
  "Nora Blake",
  "Caleb Rivers",
  "Maya Ellis",
  "Evan Porter",
  "Ivy Harmon",
  "Owen Clarke",
  "Tessa Ward",
  "Felix Nolan",
  "Ruby Keller",
  "Rowan Price",
  "Elise Martin",
  "Kai Turner",
  "Zara Quinn",
  "Hunter Lane",
  "Chloe Maddox",
  "Silas Avery",
  "Lila Benson",
  "Grayson Wells",
  "Piper Vaughn",
  "Jude Emerson",
  "Hazel Rhodes",
  "Theo Marlowe",
  "Isla Bowen",
  "Cameron Wilde",
  "Freya Sterling",
  "Asher Doyle",
  "Naomi Cross",
  "Declan Frost",
  "Violet Mercer",
  "Luca Hart",
  "Stella Briggs",
  "Maddox Reed",
  "Elena Ford",
  "Rhett Collins",
  "Sienna Drake",
  "Archer Flynn",
  "Mila Hayes",
  "Emmett Tate",
  "Jade Sullivan",
  "Weston Pierce",
  "Clara Dawson",
];

// get images
app.get("/api/v1/images", (req: Request, res: Response) => {
  const { page, limit } = req.query;

  // check auth
  const auth = getAuth(req);
  // console.log("Auth object here: ", auth);
  const is_valid = auth.sessionStatus;
  console.log(is_valid);

  const startIndex = (Number(page) - 1) * Number(limit);
  const to_send = dummies.slice(startIndex, startIndex + Number(limit));

  if (is_valid === "active") return res.status(200).json({ data: to_send });
});

app.listen(PORT, () => {
  console.log(`Server is up & listening here: http://localhost:${PORT}`);
});
