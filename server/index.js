const express = require("express");
const router = express.Router();

const {
  signUpUser,
  loginUser,
  checkSession,
  listUsers,
} = require("./repo/user-repo");
const {
  sendContactUsMessage,
  listContacts,
} = require("./repo/contact-us-repo");

// sign up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  try {
    //
    const r = await signUpUser(name, email, password);
    res.status(201).json({ token: r.token, id: r.id });
    //
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      // duplicate key
      return res.status(400).json({ error: "Email already in use" });
    }
    res.status(400).json({ error: "Registration failed" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //

    const r = await loginUser(email, password);
    res.status(200).json({ token: r.token, id: r.id });

    //
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// session
router.get("/session", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const authSplit = req.headers.authorization.split(" ");
    if (authSplit.length !== 2 || authSplit[0] !== "Bearer") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authSplit[1];
    if (!token || token === "null") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //
    const user = await checkSession(token);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// contact

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const r = await sendContactUsMessage(name, email, subject, message);
    res.status(201).json(r);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Contact failed" });
  }
});

// list all users
router.get("/list-users", async (req, res) => {
  try {
    const users = await listUsers();

    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(users, null, 4));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "List users failed" });
  }
});

// list all contacts
router.get("/list-contacts", async (req, res) => {
  try {
    const contacts = await listContacts();

    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(contacts, null, 4));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "List contacts failed" });
  }
});

module.exports = router;
