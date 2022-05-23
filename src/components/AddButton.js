import React from "react";
import styled from "styled-components";

const AddButton = ({ setIsAdding }) => {
  return (
    <div>
      <AddButtonStyle onClick={() => setIsAdding(true)}>
        Add New Customer
      </AddButtonStyle>
    </div>
  );
};

const AddButtonStyle = styled.button`
  display: flex;
  margin-left: auto;
  background-color: #34c19e;
  border: none;
  padding: 1rem 2rem;
  color: #fff;
  font-weight: bold;
  border-radius: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

export default AddButton;
