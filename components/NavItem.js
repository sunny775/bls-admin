import React from "react";
import styled from "styled-components";

export const NavItem = ({ children}) => <Div>{children}</Div>;
const Div = styled.div`
  float: left;
  text-align: center;
  padding: 20px;
  height: 100% !important;
  text-decoration: none;
  font-size: 18px;
  @media(max-width: 870px){
    display: none;
  }
`;

//{ display: flex;
// align-items: center;}
