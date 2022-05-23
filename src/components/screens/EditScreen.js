import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
const EditScreen = ({
  customers,
  selectedCustomer,
  setCustomers,
  setIsEditing,
}) => {
  const id = selectedCustomer.id;
  const [fullName, setFullName] = useState(selectedCustomer.fullName);
  const [email, setEmail] = useState(selectedCustomer.email);
  const [street, setStreet] = useState(selectedCustomer.address.street);
  const [houseNo, setHouseNo] = useState(selectedCustomer.address.houseNo);
  const [city, setCity] = useState(selectedCustomer.address.city);
  const [zipCode, setZipCode] = useState(selectedCustomer.address.zipCode);
  const [latitude, setLatitude] = useState(selectedCustomer.address.latitude);
  const [longitude, setLongitude] = useState(
    selectedCustomer.address.longitude
  );

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODING_API);

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

  const updateHandler = (e) => {
    e.preventDefault();

    if (!fullName || !email || !street || !houseNo || !city || !zipCode) {
      return alert("Fill Empty Inputs");
    }
    const customer = {
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

    for (let i = 0; i < customers.length; i++) {
      if (customers[i].id === id) {
        customers.splice(i, 1, customer);
        break;
      }
    }

    setCustomers(customers);
    localStorage.setItem("customers", JSON.stringify(customers));
    if (latitude > 0) {
      setIsEditing(false);
    }
  };
  return (
    <div className="add--container">
      <h2>Edit customer</h2>
      <form onSubmit={updateHandler}>
        <div className="inner--form--row">
          <label htmlFor="fullName">Full Name:</label>
          <input
            id="fullName"
            type="text"
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
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <div className="actions--row">
          <button className="update--btn" type="submit" value="Update">
            Update
          </button>
          <button
            className="cancel--btn"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditScreen;
