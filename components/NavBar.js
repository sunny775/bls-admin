import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavItem } from "./NavItem";
import logo from "../images/new-logo.png";
import wallet from "../images/wallet.png";
import { AuthContext } from "../context/authContext";
import { MobileView } from "./MobileView";

const buttons = {
  margin: 10,
};
const Nav = styled.div`
  height: 100px;
  background: #2e7d32;
  padding: 0 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.4s;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`;
const Wallet = styled.div`
  height: 50px;
  width: fit-content;
  float: right !important;
  @media (max-width: 870px) {
    display: none;
  }
`;
const SignIn = styled(Button)`
  color: white;
  border-radius: 15px;
  margin-left: 10px;
`;
const Div = styled.div`
  height: 120px;
  display: flex;
  width: 120px;
  background-colof: red;
  border-radius: 50%;
  background-image: url(${logo});
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const NavLink = styled(Link)`
  text-decoration: none !important;
  color: white;
  :hover {
    opacity: 0.8;
    color: white;
  }
`;
const Brand = styled.div`
  font-family: "Lobster", cursive;
  opacity: 0.8;
  font-size: calc(4px + 2vmin);
  padding-right: 20px;
`;
const Span = styled.span`
  color: white;
  font-size: 30px;
  padding: 20px;
  padding-right: 40px;
  cursor: pointer;
  @media (min-width: 870px) {
    display: none;
  }
`;

export const NavBar = () => {
  const [mobileWidth, setMobileWidth] = useState("0px");
  useEffect(() => {});

  const openMobileNav = () => setMobileWidth("100%");
  const closeMobileNav = () => setMobileWidth("0px");

  const { data, userDetails } = useContext(AuthContext);
  const { username } = userDetails;
  const { phoneNumber } = data;
  return (
    <Nav id="navbar">
      <Left id="navbar-left">
        <div id="logo" style={{ padding: "5px", float: "left" }}>
          <Link to="/">
            <Div></Div>
          </Link>
        </div>
        <Brand>
          <NavLink to="/">...helping you save for a BetterLife</NavLink>
        </Brand>
        <NavItem>
          <NavLink to="/about">About Us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact">Contact</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/blog">Blog</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/support">Support</NavLink>
        </NavItem>
      </Left>

      <Wallet>
        {username ? (
          <Link to="/account" style={buttons}>
            <img src={wallet} height="100%" alt="wallet" />
            <SignIn variant="outline-success" size="sm">
              <strong>{username}</strong>
            </SignIn>
          </Link>
        ) : phoneNumber ? (
          <Link to={`/settings/${phoneNumber}/edit-profile`} style={buttons}>
            <img src={wallet} height="100%" alt="wallet" />
            <SignIn variant="outline-success" size="sm">
              <strong>{phoneNumber}</strong>
            </SignIn>
          </Link>
        ) : (
          <Link to="/sign-in" style={buttons}>
            <img src={wallet} height="100%" alt="wallet" />
            <SignIn variant="outline-success" size="sm">
              sign in
            </SignIn>
          </Link>
        )}
      </Wallet>
      <Span onClick={openMobileNav}>&#9776;</Span>
      <MobileView
        width={mobileWidth}
        close={closeMobileNav}
        data={data}
        userDetails={userDetails}
      />
    </Nav>
  );
};
