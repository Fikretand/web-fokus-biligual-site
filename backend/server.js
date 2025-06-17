const express = require("express");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { contactFormSchema, sanitizeInput } = require("./validation");

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_ACCESS_PASSWORD;
const ALLOWED_ORIGIN = process.env.PRODUCTION_DOMAIN;

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const allowedOrigins = [ALLOWED_ORIGIN];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(compression());
app.use(helmet());


function authenticate(req, res, next) {
  const password = req.headers["x-admin-password"];
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.use("/users", authenticate);

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true } });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({ data: { email, password: hashedPassword } });
    res.json({ id: newUser.id, email: newUser.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/contact", contactLimiter, async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const parsed = contactFormSchema.safeParse({ name, email, phone, message });
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const sanitizedData = {
      name: sanitizeInput(parsed.data.name).trim(),
      email: parsed.data.email ? parsed.data.email.trim() : "",
      phone: sanitizeInput(parsed.data.phone).trim(),
      message: sanitizeInput(parsed.data.message).trim(),
    };

    await prisma.contactMessage.create({
      data: sanitizedData,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

app.get("/contact", async (req, res) => {
  const password = req.headers["x-admin-password"];
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


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { app, prisma };
