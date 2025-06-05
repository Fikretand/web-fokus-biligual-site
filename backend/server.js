const express = require("express");
const cors = require("cors");
const compression = require("compression");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_ACCESS_PASSWORD;

app.use(cors());
app.use(express.json());
app.use(compression());

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

app.get("/contact", async (req, res) => {
  const password = req.headers["x-admin-password"];
  console.log('Primljena lozinka:', password);
  console.log('Lozinka iz env:', ADMIN_PASSWORD);
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const messages = await prisma.contactMessage.findMany();
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.delete("/contact/:id", async (req, res) => {
  const password = req.headers["x-admin-password"];
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    await prisma.contactMessage.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete message" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
