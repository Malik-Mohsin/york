import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./api";
import { getCurrentUser } from "./loginUser";

const useUserProfile = () => {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(true);

  const uId = getCurrentUser();

  const getUserData = async () => {
    const url = `${API_URL}/api/users/profile`;

    try {
      const { data } = await axios.get(`${url}/${uId}`);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersData = async () => {
    const url = `${API_URL}/api/orders/${uId}`;
    try {
      const { data } = await axios.get(url);
      setOrders(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getUserData();
    getOrdersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { userData, orders, loading };
};

export default useUserProfile;
