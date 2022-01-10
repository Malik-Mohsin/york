import express from "express";
import { db } from "../utils/firebase-config.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const router = express.Router();
const orderRef = collection(db, "orders");
const userRef = collection(db, "users");

router.post("/", async (req, res) => {
  const { productName, productPrice, userId, productId, quantityInStock } =
    req.body;
  const obj = {
    productName,
    productPrice,
    userId,
    productId,
    quantityInStock,
  };

  const deductPriceObj = {
    accountBalance: productPrice,
  };
  const newQuantity = {
    quantityInStock: quantityInStock - 1,
  };
  let accountBalance = null;

  const data = await getDocs(userRef);
  const list = data.docs.map((doc) => doc.data());
  const result = list.find((user) => user.userId === userId);

  if (result) {
    accountBalance = result.accountBalance;
    let newAccountBalance = accountBalance - productPrice;
    deductPriceObj.accountBalance = newAccountBalance;
  }
  if (accountBalance < productPrice) {
    res.status(400).send("Insufficient funds");
    return;
  } else {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, deductPriceObj);

    const prodDoc = doc(db, "products", productId);
    await updateDoc(prodDoc, newQuantity);

    await addDoc(orderRef, obj)
      .then(() => res.send("Purchased successfully"))
      .catch(() => res.status(400).send("Something went wrong"));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await getDocs(orderRef);
    const list = data.docs.map((doc) => doc.data());
    const result = list.filter((user) => user.userId === req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.status(400).send("No orders found");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

export default router;
