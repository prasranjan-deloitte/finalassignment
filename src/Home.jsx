import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import "@clayui/css/lib/css/atlas.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ClayForm, { ClayInput } from "@clayui/form";
import "./CSS/home.css";
import ProjectBoard from "./Components/ProjectBoard";

import logo from "./Images/Icon (1).png";

import second from "./Images/secondimage.svg";
const Home = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  function validationSchema() {
    return Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
    });
  }
  const initialValues = {
    email: "",
    password: "",
  };
  function handleSubmit(data) {
    console.log("dkdkk");
    console.log(JSON.stringify(data, null, 2));

    handleLogin();
  }

  const handleLogin = async () => history.push("/login");

  const handleLogout = async () => oktaAuth.signOut();

  if (!authState) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {authState.isAuthenticated ? (
        <ProjectBoard />
      ) : (
        <>
          <div className="d-flex flex-row overflow-hidden">
            <div className="vh-100 bg-dark" style={{ width: "40%" }}>
              <div className="col-8 col-sm-6">
                <img
                  alt="responsive image"
                  className="img-fluid c-mt-md-10 c-ml-md-8"
                  src={logo}
                />
              </div>
              <div className="col-12 col-sm-8">
                <img
                  alt="responsive image"
                  className="img-fluid c-mt-md-10 c-ml-md-6"
                  src={second}
                />
              </div>
            </div>
            <div>
              <div className="center text-10 text-weight-normal">Login</div>
              <div className="register-form center c-mt-md-4">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="email" className="fontFamily">
                          {" "}
                          Email{" "}
                        </label>
                        <Field
                          name="email"
                          type="email"
                          className={
                            "form-control" +
                            (errors.email && touched.email
                              ? " is-invalid"
                              : "") +
                            " feildCSS"
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password"> Password </label>
                        <Field
                          name="password"
                          type="password"
                          className={
                            "form-control" +
                            (errors.password && touched.password
                              ? " is-invalid"
                              : "") +
                            " feildCSS"
                          }
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group c-mt-md-5">
                        <button
                          type="submit"
                          className="btn btn-primary bg-dark w-100"
                        >
                          LOGIN
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}

      {/* {authState.isAuthenticated ? (
        <button id="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button id="login-button" type="button" onClick={handleLogin}>
          Login
        </button>
      )} */}
    </>
  );
};

export default Home;
