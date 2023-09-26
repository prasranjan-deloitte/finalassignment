import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import Header from "./Header";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../CSS/createissue.css";
import { ClaySelect } from "@clayui/form";
import { useSelector } from "react-redux";

const CreateIssue = () => {
  const [allUser, setAllUser] = useState([]);
  function validationSchema() {
    return Yup.object().shape({
      summary: Yup.string().required("Summary is required"),
      type: Yup.string().required("Type is required"),
      projectID: Yup.string().required("Project is required"),
      description: Yup.string().required("Description is required"),
      priority: Yup.string().required("Priority is required"),
      assignee: Yup.string().required("assignee is required"),
      tags: Yup.string().required("Tags is required"),
      sprint: Yup.string().required("Sprint is required"),
      storyPoint: Yup.string().required("Story point is required"),
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
  useEffect(() => {
    getAllUser();
  }, []);
  const allProject = useSelector((store) => store.allProject.allProject);
  const initialValues = {
    summary: "",
    type: "",
    projectID: "",
    description: "",
    priority: "",
    assignee: "",
    tags: "",
    sprint: "",
    storyPoint: "",
  };
  const createIssue = async (bodyValue) => {
    bodyValue.storyPoint = parseInt(bodyValue.storyPoint);
    bodyValue.tags = bodyValue.tags.split(" ");
    bodyValue.priority = parseInt(bodyValue.priority);
    bodyValue.assignee = parseInt(bodyValue.assignee);
    bodyValue.type = parseInt(bodyValue.type);
    bodyValue.status = 4;
    console.log(bodyValue);
    const data = await fetch(
      "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/issue",
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
  function handleSubmit(data) {
    console.log(data);

    createIssue(data);
  }
  return (
    <>
      <div className="d-flex align-content-lg-stretch">
        <SideNav />
        <div className="w-100 d-flex flex-column">
          <Header />
          <div className="d-flex justify-content-between c-p-5 w-100 c-mt-4">
            <div className="detailtext">Create User Stories/ Tasks/ Bugs </div>
          </div>
          <div className="register-form c-pl-5 c-pr-5 d-flex">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="w-100">
                  <div className="form-group">
                    <label htmlFor="summary" className="fontFamily">
                      {" "}
                      Summary{" "}
                    </label>
                    <Field
                      name="summary"
                      type="text"
                      placeholder="Add Summary"
                      className={
                        "form-control" +
                        (errors.summary && touched.summary
                          ? " is-invalid"
                          : "") +
                        " summary-feild"
                      }
                    />
                    <ErrorMessage
                      name="summary"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="form-group w-50 d-flex flex-column">
                      <label className="text-5 text-weight-normal">Type</label>
                      <Field
                        as="select"
                        name="type"
                        className={
                          "form-control" +
                          (errors.type && touched.type ? " is-invalid" : "") +
                          " summary-feild"
                        }
                      >
                        <option value="1">BUG</option>
                        <option value="2">TASK</option>
                        <option value="3">STORY</option>
                      </Field>
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group w-50 d-flex flex-column c-ml-4">
                      <label className="text-5 text-weight-normal">
                        Project
                      </label>
                      <Field
                        as="select"
                        name="projectID"
                        className={
                          "form-control" +
                          (errors.projectID && touched.projectID
                            ? " is-invalid"
                            : "") +
                          " summary-feild"
                        }
                      >
                        {allProject.map((project) => (
                          <option
                            value={project.projectID}
                            key={project.projectID}
                          >
                            {project.projectName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" className="fontFamily">
                      {" "}
                      Description{" "}
                    </label>
                    <Field
                      name="description"
                      type="textarea"
                      className={
                        "form-control" +
                        (errors.description && touched.description
                          ? " is-invalid"
                          : "") +
                        " textarea-feild"
                      }
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="form-group w-50 d-flex flex-column">
                      <label className="text-5 text-weight-normal">
                        Priority
                      </label>
                      <Field
                        as="select"
                        name="priority"
                        className={
                          "form-control" +
                          (errors.priority && touched.priority
                            ? " is-invalid"
                            : "") +
                          " summary-feild"
                        }
                      >
                        <option value={1}>LOW</option>
                        <option value={2}>MEDIUM</option>
                        <option value={3}>HIGH</option>
                      </Field>
                      <ErrorMessage
                        name="priority"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group w-50 d-flex flex-column c-ml-4">
                      <label className="text-5 text-weight-normal">
                        assignee
                      </label>
                      <Field
                        as="select"
                        name="assignee"
                        className={
                          "form-control" +
                          (errors.assignee && touched.assignee
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
                        name="assignee"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="form-group w-50 d-flex flex-column">
                      <label className="text-5 text-weight-normal">Tags</label>
                      <Field
                        name="tags"
                        type="text"
                        className={
                          "form-control" +
                          (errors.tags && touched.tags ? " is-invalid" : "") +
                          " summary-feild"
                        }
                      />
                      <ErrorMessage
                        name="tags"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group w-50 d-flex flex-column c-ml-4">
                      <label className="text-5 text-weight-normal">
                        Sprint
                      </label>
                      <Field
                        as="select"
                        name="sprint"
                        className={
                          "form-control" +
                          (errors.sprint && touched.sprint
                            ? " is-invalid"
                            : "") +
                          " summary-feild"
                        }
                      >
                        <option value="Sprint 1">Sprint 1</option>
                        <option value="Sprint 2">Sprint 2</option>
                        <option value="Sprint 3">Sprint 3</option>
                      </Field>
                      <ErrorMessage
                        name="sprint"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="form-group w-50 d-flex flex-column">
                      <label className="text-5 text-weight-normal">
                        Story Points
                      </label>
                      <Field
                        name="storyPoint"
                        type="text"
                        placeholder="0, 1, 2....."
                        className={
                          "form-control" +
                          (errors.storyPoint && touched.storyPoint
                            ? " is-invalid"
                            : "") +
                          " summary-feild"
                        }
                      />
                      <ErrorMessage
                        name="storyPoint"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-group c-mt-md-5">
                    <button type="submit" className="btn text-white bg-dark">
                      Create Issue
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

export default CreateIssue;
