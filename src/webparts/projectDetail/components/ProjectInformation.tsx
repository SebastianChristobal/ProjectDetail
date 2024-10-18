import * as React from "react";
import { IProjectDetailProps } from "./IProjectDetailProps";
import { Label } from "@fluentui/react/lib/Label";
import Styles from "./ProjectDetail.module.scss";
//import project_img from "../projekt_icon/project_icon.png";
import { Button } from "./UI/Button";
import { ProjectLevel } from "./ProjectLevel";
import { EditPanel } from "./UI/Panel";
import { EditProject } from "./EditProject";

export const ProjectInformation: React.FC<IProjectDetailProps> = ({
  project,
  projectTypes,
  ...props
}) => {
  const [edit, onEdit] = React.useState<boolean>(false);
  const projectInfo = project;

  const handleEdit = React.useCallback((): void => {
    onEdit(true);
  }, []);

  const handleClose = React.useCallback(() => {
    onEdit(false);
  }, []);

  const content =
    projectInfo !== undefined ? (
      <div className={Styles.container}>
        {edit && (
          <EditPanel edit={edit} onClose={handleClose}>
            <EditProject
              project={projectInfo}
              projectTypes={projectTypes}
              {...props}
            />
          </EditPanel>
        )}
        <div className={Styles.item}>
          <header>
            <div className="flex items-center justify-between">
              <h1 className={Styles.header}>{projectInfo.Title}</h1>
              {/* <Button
      //onClick={ onDelete }
      //className="text-gray-600 hover:text-gray-950"
      >
        Delete
      </Button> */}
            </div>
          </header>
          <div className="flex  gap-4 content-stretch autofit">
            <div className="w-2/4">
              <h3 className={Styles.item_header}>Projekttyp</h3>
              <Label className={Styles.item_title}>
                {projectInfo.ProjectType.Title}
              </Label>
              <h3 className={Styles.item_header}>Kund</h3>
              <Label className={Styles.item_title}>
                {projectInfo.Customer}
              </Label>
              <h3 className={Styles.item_header}>Projektledare</h3>
              <Label className={Styles.item_title}>
                {projectInfo.ProjectLeader.Title}
              </Label>
              <h3 className={Styles.item_header}>Projektansvarig</h3>
              <Label className={Styles.item_title}>
                {projectInfo.ProjectManager.Title}
              </Label>
              <h3 className={Styles.item_header}> Projektmedlemmar</h3>
              <Label className={Styles.item_title}>
                {projectInfo.ProjectMembers.map((member: any, index: number) =>
                  index === 0 ? member.Title : `, ${member.Title}`
                )}
              </Label>
              {/* <p className="mb-4 text-gray-400">
                  DATE 2027-07-07
                  {formattedDate}
                  </p> */}
            </div>
          </div>
        </div>
        <div className={Styles.item}>
          <ProjectLevel selectedProject={projectInfo} />
        </div>
        <div className={Styles.item}>
          <div className={Styles.image_container}>
            <img
              src={
                "https://ionii.sharepoint.com/sites/Projektportalen/Image/project_icon.png"
              }
              width={260}
              height={260}
              title="image"
            />
          </div>
          <div className={Styles.edit_button}>
            <Button onClick={handleEdit}>{edit ? "Editing..." : "Edit"}</Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="w-3/4 bg-[#f3f3f37d]">
        <p>Loading...</p>
      </div>
    );

  return <>{content}</>;
};
