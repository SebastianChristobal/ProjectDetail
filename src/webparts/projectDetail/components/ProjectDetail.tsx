import * as React from "react";
import {
  useState,
  useEffect,
  //  useCallback
} from "react";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { IStackTokens, Stack } from "@fluentui/react/lib/Stack";
import type { IProjectDetailProps } from "./IProjectDetailProps";
import useFetch from "./hooks/useFetch";
import { SelectedProject } from "./SelectedProject";
import { fetchProjects, fetchFaser } from "./service/SPService";
import { fetchProjectTypes } from "./service/SPService";
import { DummyActivities, DummyControlpoints } from "./Dummys/DummyTodos";

const stackTokens: IStackTokens = {
  childrenGap: 20,
};

export const ProjectDetail: React.FC<IProjectDetailProps> = (props) => {
  const { context } = props;

  const { fetchData: getAllProjects } = useFetch(fetchProjects, context, []);
  const { fetchData: getProjectTypes } = useFetch(
    fetchProjectTypes,
    context,
    []
  );
  const { fetchData: getSteps } = useFetch(fetchFaser, context, []);
  const DUMMY_ACTIVITIES = DummyActivities;
  const DUMMY_CONTROLPOINTS = DummyControlpoints;
  const [projectTypes, setProjectTypes] = useState({});
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: getAllProjects ? getAllProjects : [],
    activities: DUMMY_ACTIVITIES,
    controlPoints: DUMMY_CONTROLPOINTS,
  });

  useEffect(() => {
    // Update project types if the fetched data is available
    if (getProjectTypes && Object.keys(getProjectTypes).length > 0) {
      setProjectTypes(getProjectTypes);
    }
  }, [getProjectTypes]);
  useEffect(() => {
    // Update projects when the fetched projects change
    if (getAllProjects && getAllProjects.length > 0) {
      setProjectState((prevState) => ({
        ...prevState,
        projects: getAllProjects,
      }));
    }
  }, [getAllProjects]);

  // const handleSelectedProject = useCallback((Id: any): void => {
  //   setProjectState((prevProjectState) => {
  //     return {
  //       ...prevProjectState,
  //       selectedProjectId: Id,
  //     };
  //   });
  // }, []);

  let selectedProject: any;
  let selectedObjectId: any;
  if (projectState.projects.length > 0) {
    const id: string | undefined = window.location.href.split("=").pop();
    selectedObjectId = id ? parseInt(id, 10) : 0;
    selectedProject = projectState.projects.find(
      (project: any) => project.Id === 74
    );
  }

  const content =
    projectState.projects.length > 0 ? (
      <SelectedProject
        {...props}
        // onDelete={ handleDeleteProject }
        // addTask={ handleAddTask }
        // deleteTask={ handleDeleteTask }
        steps={getSteps}
        project={selectedProject}
        projectTypes={projectTypes}
        activities={projectState.activities}
        controlPoints={projectState.controlPoints}
        selectedObjectId={selectedObjectId}
      />
    ) : (
      <Stack tokens={stackTokens}>
        <div>
          <Spinner label="loading..." />
        </div>
      </Stack>
    );

  return <main>{content}</main>;
};
