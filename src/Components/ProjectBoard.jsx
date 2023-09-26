import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import Header from "./Header";
import ClayButton from "@clayui/button";
import "../CSS/projectboard.css";
import { ClaySelect } from "@clayui/form";
import moment from "moment-timezone";
import ClayForm, { ClayInput } from "@clayui/form";
import { useDispatch, useSelector } from "react-redux";
import { addFilterCriteria } from "../Utils/filterSlice";
import { addProject } from "../Utils/projectSlice";
import ClayMultiSelect from "@clayui/multi-select";
import ShowProject from "./ShowProject";
const ProjectBoard = () => {
  const [projectNo, setProjectNo] = useState("1");
  const [allUser, setAllUser] = useState([]);
  const allProject = useSelector((store) => store.allProject);
  const dispatch = useDispatch();
  const [asignne, setAsignne] = useState(null);
  console.log("ass:", asignne);
  const projectOptions = [
    {
      label: "Project Name 01",
      value: "1",
    },
    {
      label: "Project Name 02",
      value: "2",
    },
    {
      label: "Project Name 03",
      value: "3",
    },
    {
      label: "Project Name 04",
      value: "4",
    },
  ];
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const sourceItems = [
    {
      label: "LOW",
      value: "1",
    },
    {
      label: "MEDIUM",
      value: "2",
    },
    {
      label: "HIGH",
      value: "3",
    },
  ];

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

  const getAllProject = async () => {
    try {
      const data = await fetch(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/project"
      );
      const jsondata = await data.json();
      dispatch(addProject(jsondata));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProject();
    getAllUser();
  }, []);

  useEffect(() => {
    dispatch(
      addFilterCriteria({
        asignne: asignne,
        items: items.map((item) => item.value),
      })
    );
  }, [asignne, items]);

  return (
    <>
      <div className="d-flex align-content-lg-stretch">
        <SideNav />

        <div className="w-100 d-flex flex-column">
          <Header />

          <div className="d-flex justify-content-between c-p-5 w-100 c-mt-4">
            <div className="detailtext">Project Details </div>
            <ClayButton className="bg-dark">VIEW INSIGHTS</ClayButton>
          </div>
          <div className="c-p-5 d-flex justify-content-around w-100">
            <div className="w-100">
              <label className="text-5 text-weight-normal">Project Name</label>
              <ClaySelect
                aria-label="Select Label"
                id="mySelectId"
                value={projectNo}
                onChange={(e) => setProjectNo(e.target.value)}
                className="feildCSS"
              >
                {projectOptions.map((item) => (
                  <ClaySelect.Option
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    className="bg-white"
                  />
                ))}
              </ClaySelect>
            </div>
            <div className="w-100 ml-4">
              <label className="text-5 text-weight-normal">Project Owner</label>
              <ClayInput
                id="basicInputText"
                placeholder="search"
                type="text"
                className="feildCSS"
                value={"Pushpa Raj"}
              />
            </div>
          </div>
          <div className="d-flex c-pl-5 c-pr-5 date">
            <div className="">
              Start Date :{" "}
              {allProject?.allProject[0]?.projectStartDate
                ?.slice(0, 10)
                .split("-")
                .reverse()
                .join("/")}
            </div>
            <div className="c-ml-4">
              End Date :{" "}
              {allProject?.allProject[0]?.projectEndDate
                ?.slice(0, 10)
                .split("-")
                .reverse()
                .join("/")}
            </div>
          </div>
          <div className="c-p-5 d-flex">
            <div className="">
              <ClaySelect
                aria-label="Select Label"
                id="mySelectId"
                value={asignne}
                onChange={(e) => setAsignne(e.target.value)}
                className="assignne"
              >
                {allUser.map((item) => (
                  <ClaySelect.Option
                    key={item.id}
                    label={item.name}
                    value={item.id}
                    className="bg-white"
                  />
                ))}
              </ClaySelect>
              <label className="text-3 text-weight-normal mt-1">
                Filter Asignne
              </label>
            </div>
            <div className="ml-3">
              <ClayMultiSelect
                style={{
                  height: "2rem",
                  width: "11rem",
                }}
                inputName="myInput"
                items={items}
                onChange={setValue}
                onItemsChange={setItems}
                sourceItems={sourceItems}
                value={value}
              />
              <label className="text-3 text-weight-normal mt-1">
                Filter Priority
              </label>
            </div>
          </div>
          <ShowProject />
        </div>
      </div>
    </>
  );
};

export default ProjectBoard;
