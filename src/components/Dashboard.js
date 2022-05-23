import React, { useState } from "react";
import styled from "styled-components";

import AddButton from "./AddButton";
import AddWindow from "./AddWindow";
import EditWindow from "./EditWindow";
import CustomersGrid from "./CustomersGrid";

const Dashboard = () => {
  const localData = JSON.parse(localStorage.getItem("customers"));
  const result = localData ? localData : [];
  const [customers, setCustomers] = useState(result);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const editHandler = (id) => {
    const [customer] = customers.filter((customer) => customer.id === id);
    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  const deleteHandler = (id) => {
    const [customer] = customers.filter((customer) => customer.id === id);
    alert("Are you sure you want delete " + customer.fullName + "?");
    const filtered = customers.filter((customer) => customer.id !== id);
    localStorage.setItem("customers", JSON.stringify(filtered));
    setCustomers(JSON.parse(localStorage.getItem("customers")));
  };
  return (
    <MainContainer className="container">
      {!isAdding && !isEditing && (
        <>
          <AddButton setIsAdding={setIsAdding} />
          <CustomersGrid
            customers={customers}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        </>
      )}
      {isAdding && (
        <AddWindow
          customers={customers}
          setCustomers={setCustomers}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <EditWindow
          customers={customers}
          selectedCustomer={selectedCustomer}
          setCustomers={setCustomers}
          setIsEditing={setIsEditing}
        />
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding: 0 40px;
`;

export default Dashboard;
