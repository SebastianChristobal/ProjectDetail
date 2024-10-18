import * as React from "react";
import { IProjectDetailProps } from "./IProjectDetailProps";
import Styles from "./ProjectDetail.module.scss";
import { Tasks } from "./Tasks/Tasks";
import { ProgressIndicator } from "./Progress/ProgressIndicator";
//import { Button } from "../UI/Button";
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
  IPivotStyles,
} from "office-ui-fabric-react";
import { ProjectInformation } from "./ProjectInformation";

// import { Project } from "./SelectedProject/Project";

const pivotStyles: Partial<IPivotStyles> = {
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  // },
  //   itemContainer: {
  //     backgroundColor: "#ABEBC6",
  //   },
  link: {
    borderStyle: "solid",
    borderWidth: "1px",
    marginRight: "7px",
    width: "auto",
    borderRadius: "5px 5px 0px 0px",
  },
  linkIsSelected: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    marginRight: "7px",
    width: "auto",
    borderRadius: "5px 5px 0px 0px",
  },
};

export const SelectedProject: React.FC<IProjectDetailProps> = ({
  project,
  // onDelete,
  // addTask,
  // deleteTask,
  selectedObjectId,
  faser,
  projectTypes,
  controlPoints,
  activities,
  ...props
}) => {
  // const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  // })
  // const selectedProject = project;
  const selectedProjectActivities = activities;
  const selectedControlPoint = controlPoints;

  // const handleLinkClick = (event: any): void => {
  //   console.log(event.target.value);
  // };

  const content =
    project !== undefined ? (
      <div>
        <ProjectInformation
          project={project}
          projectTypes={projectTypes}
          {...props}
        />
        <div className={Styles.progressIndicator}>
          <ProgressIndicator project={project} faser={faser} />
        </div>
        <div className={Styles.tabs}>
          <Pivot
            defaultSelectedKey={"0"}
            linkFormat={PivotLinkFormat.tabs}
            linkSize={PivotLinkSize.large}
            styles={pivotStyles}
          >
            <PivotItem headerText="Tasks" itemKey="tasks">
              <Tasks
                project={project}
                //addTask={addTask}
                //deleteTask={deleteTask}
                activities={selectedProjectActivities}
                controlPoints={selectedControlPoint}
              />
            </PivotItem>
            <PivotItem headerText="Documents" itemKey="docs">
              <section className="">
                <div>
                  <h3>Documents</h3>
                </div>
              </section>
            </PivotItem>
          </Pivot>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );

  return <>{content}</>;
};
