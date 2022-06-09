const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
mongoose
  .connect(
    `mongodb+srv://baseinventarios:${process.env.MONGO_DB_PASS}@cluster0.lt1kb.mongodb.net/stock-app?retryWrites=true&w=majority`
  )
  .then((result) => console.log("conexión exitosa a la BBDD"))
  .catch((err) => console.log(err));

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: Number,
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
app.use(express.json());

app.post("/api/v1/products", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((result) => {
      res.status(201).json({ ok: true });
    })
    .catch((err) => console.log(err));
});

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`);
});
