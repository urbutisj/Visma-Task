import React, { useState, useRef, useEffect } from "react";
import Geocode from "react-geocode";

const AddWindow = ({ customers, setCustomers, setIsAdding }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const textInput = useRef(null);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODING_API);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  useEffect(() => {
    const getCoordinates = async () => {
      const coordinates = `${street} ${houseNo} ${city} ${zipCode}`;
      await Geocode.fromAddress(coordinates).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    if (street && houseNo && city && zipCode) {
      getCoordinates();
    }
  });

  const addHandler = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !street || !houseNo || !city || !zipCode) {
      return alert("Fill Empty Inputs");
    }

    const id = customers.length + 1;
    const newCustomer = {
      id,
      fullName,
      email,
      address: {
        street,
        houseNo,
        city,
        zipCode,
        latitude,
        longitude,
      },
    };

    customers.push(newCustomer);
    localStorage.setItem("customers", JSON.stringify(customers));
    setCustomers(customers);
    setIsAdding(false);
  };

  return (
    <div className="add--container">
      <h2>Add new customer</h2>
      <form onSubmit={addHandler}>
        <div className="inner--form--row">
          <label htmlFor="fullName">Full Name:</label>
          <input
            id="fullName"
            type="text"
            ref={textInput}
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="inner--form--row">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inner--form--row">
          <label htmlFor="street">Street:</label>
          <input
            id="street"
            type="text"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="inner--form--row">
          <label htmlFor="houseNo">House Number:</label>
          <input
            id="houseNo"
            type="text"
            name="houseNo"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
          />
        </div>
        <div className="inner--form--row">
          <label htmlFor="city">City:</label>
          <input
            id="city"
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="inner--form--row">
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            id="zipCode"
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <div className="actions--row">
          <button className="add--btn" type="submit" value="Add">
            Add
          </button>
          <button
            className="cancel--btn"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddWindow;
