import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Emprouter from "./routes/routes.js";
import EmployeeData from "./model/employee.model.js";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = 4242;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static(uploadDir));

const uri = process.env.MONGODB_URL;

mongoose
  .connect(uri)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.use("/Em", Emprouter);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ajaym.22cse@kongu.edu",
    pass: "netaigqrrijlgxvm",
  },
});

app.post("/api/send-email", (req, res) => {
  const { recipient, subject, text } = req.body;
  console.log(recipient,subject,text);
  
  const mailOptions = {
    from: "ajaym.22cse@kongu.edu",
    to: recipient,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).send({ success: false, error: error.message });
    }
    res
      .status(200)
      .send({ success: true, message: "Email sent successfully!" });
  });
});

app.post("/api/users", upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      address,
      role,
      experience,
      online,
      linkedInId,
      githubId,
    } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newUser = new EmployeeData({
      name,
      photo,
      email,
      mobileNumber,
      address,
      role,
      experience,
      online,
      linkedInId,
      githubId,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
