import React from "react";
import { Modal } from "react-bootstrap";
import Owner from "./owner";
import Form from "./Form";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";

const Header = styled(Modal.Header)`
  background: #2e7d32;
  color: white;
  letter-spacing: 2px;
`;
export default () => {
  const {
    userDetails,
    depositOpen,
    hideDeposit,
    adminDevices,
    postTransaction,
    transLoading,
  } = React.useContext(AuthContext);

  const handleClose = () => hideDeposit();

  return (
    <Modal centered show={depositOpen} onHide={handleClose}>
      <Header closeButton>
        <p>
          Fill the form below to create a deposit request.
          <br />
          Our agents will contact you on further steps
        </p>
      </Header>
      <Owner data={userDetails} />
      <Form
        owner={userDetails}
        adminDevices={adminDevices}
        postTransaction={postTransaction}
        loading={transLoading}
        type="deposit"
      />
    </Modal>
  );
};
