import React, { useState } from "react";
import ClayCard from "@clayui/card";
import "../CSS/projectcard.css";
const ProjectCard = ({ issue }) => {
  return (
    <>
      <ClayCard className="mt-2">
        <ClayCard.Body>
          <div className="d-flex justify-content-between">
            <div>ID: {issue?.id}</div>
            <div className="date-color">
              {issue?.createdOn?.slice(0, 10).split("-").reverse().join("/")}
            </div>
          </div>
          <ClayCard.Description displayType="title" className="mt-2">
            {"Lorem Ipsum"}
          </ClayCard.Description>
          <ClayCard.Description
            truncate={false}
            displayType="text"
            className="date-color"
          >
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
          </ClayCard.Description>
          <div className="d-flex justify-content-between">
            <div>{issue?.assignee?.name} </div>
            <div>
              <div>Priority</div>
              <div>
                {issue?.priority === 1 ? (
                  <button className="priority-button-class rounded-lg color-class1 text-2">
                    LOW
                  </button>
                ) : issue?.priority === 2 ? (
                  <button className="priority-button-class rounded-lg color-class2 text-2">
                    MEDIUM
                  </button>
                ) : (
                  <button className="priority-button-class rounded-lg color-class3 text-2">
                    HIGH
                  </button>
                )}
              </div>
            </div>
          </div>
        </ClayCard.Body>
      </ClayCard>
    </>
  );
};

export default ProjectCard;
