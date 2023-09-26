import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";

const ToDo = ({ allIssue, status }) => {
  const [todoProject, setTodoProject] = useState([]);
  const filterObject = useSelector((store) => store.filter.filterCriteria);
  console.log(filterObject);
  const statusText = ["TO DO", "DEVELOPMENT", "TESTING", "COMPLETED"];
  const todoIssue = allIssue.filter(
    (issue) =>
      issue.status === status &&
      (filterObject.items?.length === 0 ||
        filterObject?.items?.includes(issue.priority.toString())) &&
      (filterObject?.asignne === null ||
        filterObject?.asignne === issue.assignee.id.toString())
  );
  console.log("todo", todoIssue);

  return (
    <div className="d-flex flex-column w-25 c-p-2">
      <div className="status-text">{statusText[status - 1]}</div>
      {todoIssue.map((issue) => (
        <ProjectCard issue={issue} key={issue.id} />
      ))}
    </div>
  );
};

export default ToDo;
