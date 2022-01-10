import express from "express";
import { db } from "../utils/firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
const router = express.Router();

router.get("/", async (req, res) => {
  const productCollection = collection(db, "products");
  try {
    const data = await getDocs(productCollection);
    const list = data.docs.map((doc) => doc.data());
    res.send(list);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/", async (req, res) => {
//   const obj = {
//     productName: "Toilet Paper",
//     price: 2.5,
//     quantityInStock: 20,
//   };

//   const productCollection = collection(db, "products");
//   await addDoc(productCollection, obj)
//     .then(() => res.send("success"))
//     .catch(() => res.status(400).send("Something went wrong"));
// });

export default router;
