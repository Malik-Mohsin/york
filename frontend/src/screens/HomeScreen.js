import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { API_URL } from "../utils/api";

const HomeScreen = () => {
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);

  const getProducts = async () => {
    const url = `${API_URL}/api/products`;
    try {
      const { data } = await axios.get(url);
      setProducts(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="flex bg-gray-200 justify-center mx-auto min-h-screen">
      <div className="container my-12 mx-auto px-4 md:px-12">
        {loading || purchaseLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            <>
              {products.map((product) => (
                <ProductCard
                  key={product.productName}
                  product={product}
                  setPurchaseLoading={setPurchaseLoading}
                  getProducts={getProducts}
                />
              ))}
            </>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default HomeScreen;
