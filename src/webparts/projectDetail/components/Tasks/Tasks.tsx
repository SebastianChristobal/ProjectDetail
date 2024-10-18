import * as React from "react";
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
} from "office-ui-fabric-react";
import { IProjectDetailProps } from "../IProjectDetailProps";
import { Activities } from "./Activities";
import { ControlPoints } from "./ControlPoints";

export const Tasks: React.FC<IProjectDetailProps> = ({
  activities,
  controlPoints,
  project,
  deleteTask,
}) => {
  const filteredActivities = activities.filter(
    (task: any) => task.projectId === project.Id
  );
  const filteredControlPoints = controlPoints.filter(
    (control: any) => control.projectId === project.Id
  );
  return (
    <section className="w-full mt-8">
      {/* <NewTask
         add={addTask} 
         /> */}
      <Pivot
        defaultSelectedKey={"0"}
        linkFormat={PivotLinkFormat.links}
        linkSize={PivotLinkSize.large}
      >
        <PivotItem headerText="Activities" itemKey="myActivities">
          <>
            <Activities
              filteredActivities={filteredActivities}
              deleteTask={deleteTask}
            />
          </>
        </PivotItem>
        <PivotItem headerText="Controlpoints" itemKey="myControlPoints">
          <>
            <ControlPoints
              filteredControlPoints={filteredControlPoints}
              deleteTask={deleteTask}
            />
          </>
        </PivotItem>
        <PivotItem headerText="ATA" itemKey="myATA">
          <>
            {/* {<ATA {...props} />} */}
            <p className="text-gray-800 my-4">
              This project does not have any ATA yet...
            </p>
          </>
        </PivotItem>
      </Pivot>
    </section>
  );
};
