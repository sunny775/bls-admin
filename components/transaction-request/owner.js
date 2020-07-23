import React from "react";
import PropTypes from "prop-types";
import { ListGroup, Col } from "react-bootstrap";
import styled from "styled-components";

const Details = styled(ListGroup)`
  padding: 30px;
  background: #66bb6a;
`;
const Left = styled.span`
  font-weight: bold;
`;
const Right = styled.span`
  float: right;
`;
const Wrapper = styled.div`
  max-width: 100%;
`;
const Owner = ({ data }) => {
  return (
    <Details>
      <ListGroup.Item className="row">
        <Wrapper>
          <Left>Full Name:</Left>
          <Right>{data.displayName}</Right>
        </Wrapper>
      </ListGroup.Item>
      <ListGroup.Item className="row">
        <Wrapper>
          <Left>Account Number:</Left>
          <Right>{data.phoneNumber}</Right>
        </Wrapper>
      </ListGroup.Item>
      <ListGroup.Item className="row">
        <Wrapper>
          <Left>Primary Address:</Left>
          <Right>{data.address1}</Right>
        </Wrapper>
      </ListGroup.Item>
      <ListGroup.Item className="row">
        <Wrapper>
          <Left>City:</Left>
          <Right>{`${data.city} ${data.state}`}</Right>
        </Wrapper>
      </ListGroup.Item>
    </Details>
  );
};
Owner.propTypes = {
  data: PropTypes.object,
};
export default Owner;
