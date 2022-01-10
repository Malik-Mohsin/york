import express from "express";
import { db } from "../utils/firebase-config.js";
import { addDoc, collection, getDocs } from "firebase/firestore";

const router = express.Router();

const userRef = collection(db, "users");

router.get("/profile/:id", async (req, res) => {
  try {
    const data = await getDocs(userRef);
    const list = data.docs.map((doc) => doc.data());
    const result = list.find((user) => user.userId === req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const data = await getDocs(userRef);
    const list = data.docs.map((doc) => doc.data());
    const result = list.find((user) => user.email === email);
    if (result) {
      res.send(result);
    } else {
      res.status(400).send("Invalid email");
    }
  } catch (error) {
    res.status(400).send("Invalid email");
  }
});

router.post("/", async (req, res) => {
  const obj = {
    accountBalance: 500,
    email: "mohsin@gmail.com",
    name: "mohsin",
    isMember: true,
  };

  await addDoc(userRef, obj)
    .then(() => res.send("success"))
    .catch(() => res.status(400).send("Something went wrong"));
});

export default router;
