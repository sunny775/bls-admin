import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { SubmitBtn } from "../SubmitBtn";

const schema = yup.object({
  amount: yup
    .number()
    .moreThan(199, "*Minimum of ₦200 can be saved per deposit request")
    .lessThan(
      1000001,
      "*Current maximum saving limit per deposit request is ₦1M"
    )
    .required("*Please, enter the exact amount you wish to save at this time"),
  message: yup.string().min(30, "*Message is too short"),
});

const Div = styled.div`
  padding: 30px;
`;

export default ({ owner, adminDevices, postTransaction, loading, type }) => {

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(value) =>
        postTransaction({
          details: { ...value, status: "requested", type },
          owner,
          adminDevices,
        })
      }
      initialValues={{
        amount: "",
        message: "",
      }}
    >
      {({ getFieldProps, touched, errors, handleSubmit }) => (
        <Div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="amount">
              <Form.Control
                type="number"
                name="amount"
                placeholder="Amount"
                {...getFieldProps("amount")}
                isValid={touched.amount && !errors.amount}
                isInvalid={touched.amount && !!errors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Control
                type="textarea"
                name="message"
                placeholder="Extra information about this request"
                {...getFieldProps("message")}
                isValid={touched.message && !errors.message}
                isInvalid={touched.message && !!errors.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>

            <SubmitBtn loading={loading} text="Create request" />
          </Form>
        </Div>
      )}
    </Formik>
  );
};
