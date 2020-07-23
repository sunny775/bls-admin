import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import wallet from "../images/wallet.png";

const buttons = {
  margin: 10,
};
const SideNav = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  .nav-link {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .nav-link:hover {
    color: #f1f1f1;
  }

  .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  #main {
    transition: margin-left 0.5s;
    padding: 16px;
  }

  @media screen and (max-height: 450px) {
    padding-top: 15px;
    .nav-link {
      font-size: 18px;
    }
  }
`;
const Span = styled.span`
  color: white;
  font-size: 50px;
  opacity: 0.8;
  cursor: pointer;
`;
const Wallet = styled.div`
  height: 50px;
  }
`;
const SignIn = styled(Button)`
  color: white;
  border-radius: 15px;
  margin-left: 10px;
`;

export const MobileView = ({ width, close, data, userDetails }) => {
  const { username } = userDetails;
  const { phoneNumber } = data;

  return (
    <SideNav id="mySidenav" width={width}>
      <Span className="closebtn" onClick={close}>
        &times;
      </Span>
      <div onClick={close}>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </div>
      <div onClick={close}>
        {" "}
        <Link to="/about" className="nav-link">
          About Us
        </Link>
      </div>
      <div onClick={close}>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </div>
      <div onClick={close}>
        {" "}
        <Link to="/blog" className="nav-link">
          Blog
        </Link>
      </div>
      <Wallet className="nav-link" onClick={close}>
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
    </SideNav>
  );
};
