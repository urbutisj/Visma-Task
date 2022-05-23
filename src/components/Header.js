import React from "react";
import styled from "styled-components";

import Logo from "./../images/visma.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo" />
      <h1>Customers Management App</h1>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  @media screen and (max-width: 990px) {
    flex-direction: column;
    h1 {
      font-size: 1.2rem;
    }
  }
  img {
    width: 150px;
    height: 40px;
    object-fit: cover;
    @media screen and (max-width: 990px) {
      margin-bottom: 1rem;
    }
  }
`;

export default Header;
