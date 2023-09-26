import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import Header from "./Header";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const CreateProject = () => {
  const [allUser, setAllUser] = useState([]);
  function validationSchema() {
    return Yup.object().shape({
      projectName: Yup.string().required("Project Name is required"),
      projectOwner: Yup.string().required("Project Owner is required"),
      projectStartDate: Yup.string().required("Project Start Date is required"),
      projectEndDate: Yup.string().required("Project End Data is required"),
    });
  }
  const getAllUser = async () => {
    try {
      const data = await fetch(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/user"
      );
      const jsondata = await data.json();
      setAllUser(jsondata);
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = {
    projectName: "",
    projectOwner: "",
    projectStartDate: "",
    projectEndDate: "",
  };
  function handleSubmit(data) {
    console.log(JSON.stringify(data, null, 2));
    createProject(data);
  }
  const createProject = async (bodyValue) => {
    const data = await fetch(
      "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/project",
      {
        method: "POST",
        headers: {
          userID: 1,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyValue),
      }
    );
    const json = await data.json();
    console.log(json);
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="d-flex align-content-lg-stretch">
        <SideNav />
        <div className="w-100 d-flex flex-column">
          <Header />
          <div className="d-flex justify-content-between c-p-5 w-100 c-mt-4">
            <div className="detailtext">Create Project </div>
          </div>
          <div className="register-form c-pl-5 c-pr-5 d-flex">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="w-100">
                  <div className="d-flex justify-content-between">
                    <div className="form-group w-50 d-flex flex-column">
                      <label className="text-5 text-weight-normal">
                        Project Name
                      </label>
                      <Field
                        name="projectName"
                        type="text"
                        className={
                          "form-control" +
                          (errors.projectName && touched.projectName
                            ? " is-invalid"
                            : "") +
                          " summary-feild"
                        }
                      />
                      <ErrorMessage
                        name="projectName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group w-50 d-flex flex-column c-ml-4">
                      <label className="text-5 text-weight-normal">Owner</label>
                      <Field
                        as="select"
                        name="projectOwner"
                        className={
                          "form-control" +
                          (errors.projectOwner && touched.projectOwner
                            ? " is-invalid"
                            : "") +
                          " summary-feild"
                        }
                      >
                        {allUser.map((user) => (
                          <option value={user.id} key={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="projectOwner"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="form-group w-50 d-flex flex-column">
                      <label className="text-5 text-weight-normal">
                        Project Start Date
                      </label>
                      <Field
                        name="projectStartDate"
                        type="text"
                        className={
                          "form-control" +
                          (errors.projectStartDate && touched.projectStartDate
                            ? " is-invalid"
                            : "") +
                          " summary-feild"
                        }
                      />
                      <ErrorMessage
                        name="projectStartDate"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group w-50 d-flex flex-column c-ml-4">
                      <label className="text-5 text-weight-normal">
                        Project End Date
                      </label>
                      <Field
                        name="projectEndDate"
                        type="text"
                        className={
                          "form-control" +
                          (errors.projectEndDate && touched.projectEndDate
                            ? " is-invalid"
                            : "") +
                          " summary-feild"
                        }
                      />
                      <ErrorMessage
                        name="projectEndDate"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>

                  <div className="form-group c-mt-md-5">
                    <button type="submit" className="btn text-white bg-dark">
                      Create Project
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
