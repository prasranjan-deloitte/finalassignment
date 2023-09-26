import React, { useEffect, useState } from "react";
import "../CSS/showProject.css";
import ToDo from "./ToDo";

const ShowProject = () => {
  const [issue, setIssue] = useState([]);

  // const getAllIssue = async () => {
  //   try {
  //     const data = await fetch(
  //       "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/issue"

  //     );
  //     const jsonData = await data.json();
  //     setIssue(jsonData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllIssue();
  // }, []);
  return (
    <div className="main-container c-pt-3 c-pl-5 c-pr-10 d-flex justify-content-between w-100">
      <ToDo allIssue={issue} status={1} />
      <ToDo allIssue={issue} status={2} />
      <ToDo allIssue={issue} status={3} />
      <ToDo allIssue={issue} status={4} />
      {/* <div className="status-text w-25">DEVELOPMENT</div>
      <div className="status-text w-25">TESTING</div>
      <div className="status-text w-25">COMPLETED</div> */}
    </div>
  );
};

export default ShowProject;
