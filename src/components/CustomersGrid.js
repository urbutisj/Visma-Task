import React from "react";
import styled from "styled-components";
const CustomersGrid = (props) => {
  const { customers, editHandler, deleteHandler } = props;
  return (
    <CustomersContainer className="customers">
      {customers.length > 0 ? (
        customers.map((customer) => (
          <CustomerCard className="customer--card" key={customer.id}>
            <h3>{customer.fullName}</h3>
            <p>
              <span className="bold">Email:</span> {customer.email}
            </p>
            <p>
              <span className="bold">Address:</span> <br />
              {customer.address.street} {customer.address.houseNo},
              <br />
              {customer.address.city}, <br />
              LT-{customer.address.zipCode}
            </p>
            <p>
              <span className="bold">Latitude: </span>
              {customer.address.latitude} <br />
              <span className="bold">Longitude: </span>
              {customer.address.longitude}
            </p>
            <div className="actions--row">
              <button
                className="edit--btn"
                onClick={() => editHandler(customer.id)}
              >
                Edit
              </button>
              <button
                className="delete--btn"
                onClick={() => deleteHandler(customer.id)}
              >
                Delete
              </button>
            </div>
          </CustomerCard>
        ))
      ) : (
        <div>
          <h4>No Customers Found</h4>
        </div>
      )}
    </CustomersContainer>
  );
};

const CustomersContainer = styled.div`
  --auto-grid-min-size: 25rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
`;

const CustomerCard = styled.div`
  padding: 20px 40px;
  transition: all 0.3s ease;
  box-shadow: 0 0 25px rgb(0 0 0 / 5%);
  .edit--btn,
  .delete--btn {
    border: none;
    padding: 10px 40px;
    border-radius: 0.6rem;
  }
  .edit--btn {
    background-color: #f2e05c;
    margin-right: 1rem;
  }
  .delete--btn {
    background-color: #efa17c;
  }
  &:hover {
    box-shadow: 0 0 25px rgb(0 0 0 / 20%);
  }
`;

export default CustomersGrid;
