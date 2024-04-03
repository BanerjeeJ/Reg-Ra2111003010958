import React, { useState, useEffect } from "react";
import axios from "axios";
import login from "./login";

const loginpage = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setLaptops(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching laptops:", error);
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  return (
    <div>
      <h1>Top 10 Laptops Sold on AMZ</h1>
      <login />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {laptops.map((laptop, index) => (
            <li key={index}>
              <h2>{laptop.productName}</h2>
              <p>Price: {laptop.price}</p>
              <p>Rating: {laptop.rating}</p>
              <p>Discount: {laptop.discount}</p>
              <p>Availability: {laptop.availability}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default loginpage;
