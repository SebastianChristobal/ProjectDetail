import * as React from "react";
import { IProjectDetailProps } from "./IProjectDetailProps";
import Styles from "./ProjectDetail.module.scss";

export const ProjectLevel: React.FC<IProjectDetailProps> = ({
  selectedProject,
}) => {
  const getStatusColor = (status: string): any => {
    switch (status) {
      case "Low":
        return "#18ac47";
      case "Medium":
        return "#c2cd26";
      case "High":
        return "#cd2626";
      default:
        return "gray"; // You can set a default color for other cases
    }
  };

  return (
    <>
      <div className={Styles.project_level_container}>
        <h4 className={Styles.project_level_title}>Budget</h4>
        <div
          style={{
            backgroundColor: getStatusColor(selectedProject.Budget),
            width: "30px",
            height: "30px",
            borderRadius: "20px",
          }}
        />
      </div>
      <div className={Styles.project_level_container}>
        <h4 className={Styles.project_level_title}>Tid</h4>
        <div
          style={{
            backgroundColor: getStatusColor(selectedProject.Time),
            width: "30px",
            height: "30px",
            borderRadius: "20px",
          }}
        />
      </div>
      <div className={Styles.project_level_container}>
        <h4 className={Styles.project_level_title}>Resurser</h4>
        <div
          style={{
            backgroundColor: getStatusColor(selectedProject.Resources),
            width: "30px",
            height: "30px",
            borderRadius: "20px",
          }}
        />
      </div>
    </>
  );
};
