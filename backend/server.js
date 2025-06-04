const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await prisma.user.create({ data: { email, password } });
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const saved = await prisma.contactMessage.create({
      data: { name, email, message },
    });
    console.log("Contact message saved:", saved);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
