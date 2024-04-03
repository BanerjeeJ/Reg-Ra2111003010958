import React, { useState } from "react";
import axios from "axios";

const login = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    clientID: "",
    clientSecret: "",
    ownerName: "",
    ownerEmail: "",
    rollNo: "",
  });

  const [accessToken, setAccessToken] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://20.244.56.144/test/auth",
        formData
      );
      const { access_token } = response.data;
      setAccessToken(access_token);
      // Save access token to local storage
      localStorage.setItem("accessToken", access_token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Authorization Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Client ID:
          <input
            type="text"
            name="clientID"
            value={formData.clientID}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Client Secret:
          <input
            type="text"
            name="clientSecret"
            value={formData.clientSecret}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Owner Name:
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Owner Email:
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Roll No:
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {accessToken && (
        <div>
          <h2>Access Token:</h2>
          <p>{accessToken}</p>
        </div>
      )}
    </div>
  );
};

export default login;
