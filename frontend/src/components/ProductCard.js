import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { API_URL } from "../utils/api";
import { getCurrentUser } from "../utils/loginUser";

const ProductCard = ({ product, setPurchaseLoading, getProducts }) => {
  const uId = getCurrentUser();

  const handlePurchase = async () => {
    if (product.quantityInStock === 0) {
      toast.error("Sorry, this product is out of stock!");
      return;
    }

    setPurchaseLoading(true);
    const obj = {
      productName: product.productName,
      productPrice: product.price,
      userId: uId,
      productId: product.productId,
      quantityInStock: product.quantityInStock,
    };
    try {
      const { data } = await axios.post(`${API_URL}/api/orders`, obj);
      console.log(data);
      toast.success(data);
      setPurchaseLoading(false);
      getProducts();
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data);
      setPurchaseLoading(false);
    }
  };

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg bg-white">
        <img
          alt="Placeholder"
          className="block h-auto w-full"
          src="https://picsum.photos/600/400/?random"
        />
        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">{product.productName}</h1>
          <p className="text-grey-darker text-sm">Price: {product.price}</p>
        </header>
        <p className="text-sm p-2 md:p-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <p className="ml-2 text-sm">
            Quantity In Stock: {product.quantityInStock}
          </p>

          <button
            onClick={handlePurchase}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Purchase
          </button>
        </footer>
      </article>
    </div>
  );
};

export default ProductCard;
