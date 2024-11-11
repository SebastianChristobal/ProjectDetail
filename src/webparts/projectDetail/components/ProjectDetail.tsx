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
  const [selectedProject, setSelectedProject] = useState<any | undefined>(
    undefined
  );
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

  useEffect(() => {
    if (projectState.projects.length > 0) {
      const id = window.location.href.split("=").pop();
      //const dummyID = 74;
      const selectedObjectId = id ? parseInt(id, 10) : 0;
      const project = projectState.projects.find(
        (project: any) => project.Id === selectedObjectId
      );
      setSelectedProject(project);
    }
  }, [projectState.projects]);

  // Define a function to update the selected project
  const updateSelectedProject = (updatedProject: any): any => {
    setProjectState((prevState) => {
      // Find the index of the project to be updated
      const projectIndex = prevState.projects.findIndex(
        (project) => project.Id === updatedProject.ID
      );

      // If the project is not found, return the previous state unchanged
      if (projectIndex === -1) {
        return prevState;
      }

      // Create a shallow copy of the projects array and update only the specific project
      const updatedProjects = [...prevState.projects];
      updatedProjects[projectIndex] = updatedProject;
      setSelectedProject(updatedProjects[projectIndex]);
      return {
        ...prevState,
        projects: updatedProjects,
      };
    });

    // Update the selected project after the projectState update
    setSelectedProject(updatedProject);

    return updatedProject; // Optionally return the updated project
  };

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
        //selectedObjectId={selectedObjectId}
        updateSelectedProject={updateSelectedProject}
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
