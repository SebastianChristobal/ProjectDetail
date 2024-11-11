import * as React from "react";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { TextField } from "office-ui-fabric-react";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import {
  PeoplePicker,
  PrincipalType,
  IPeoplePickerContext,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IProjectDetailProps } from "./IProjectDetailProps";
import Styles from "../components/ProjectDetail.module.scss";
import { EditPanel } from "./UI/Panel";
import { onUpdateProject } from "./service/SPService";
import { spfi, SPFx } from "@pnp/sp";

import { IUser } from "./models/IUser";

const options: IChoiceGroupOption[] = [
  { key: "1", text: "Low" },
  { key: "2", text: "Medium" },
  { key: "3", text: "High" },
];

export const EditProject: React.FC<IProjectDetailProps> = ({
  project,
  context,
  onEdit,
  steps,
  closePanel,
  projectTypes,
  updateSelectedProject,
}) => {
  const sp = spfi().using(SPFx(context));
  const getStatusChoiceGroup = (status: string): any => {
    switch (status) {
      case "Low":
        return "1";
      case "Medium":
        return "2";
      case "High":
        return "3";
      default:
        return "1"; // You can set a default color for other cases
    }
  };

  const [isEditing, setIsEditing] = React.useState<boolean>(onEdit);
  const [selectedProjectId, setSelectedProjectId] = React.useState<any>();
  const [titleValue, setTitleValue] = React.useState<string>("");
  const [budgetValue, setBudgetValue] = React.useState<string>("");
  const [resourcesValue, setResourcesValue] = React.useState<string>("");
  const [timeValue, setTimeValue] = React.useState<string>("");
  const [customerValue, setCustomerValue] = React.useState<string>("");
  const [projectManager, setProjectManager] = React.useState<IUser[]>([]);
  const [selectedManager, setSelectedManager] = React.useState<IUser[]>([]);
  const [responsibleManager, setResponsibleManager] = React.useState<IUser[]>(
    []
  );
  const [selectedResponsibleManager, setSelectedResponsibleManager] =
    React.useState<IUser[]>([]);
  const [projectMembers, setprojectMembers] = React.useState<string[]>([]);
  const [selectedProjectMembers, setSelectedProjectMembers] = React.useState<
    IUser[]
  >([]);
  const [projectTypeOptions, setProjectTypeOptions] = React.useState<any>([]);
  const [dropdownProjectTypeOptions, setDropdownProjectTypeOptions] =
    React.useState<any>([]);
  const [stepsOptions, setStepsOptions] = React.useState<any>([]);
  const [dropdownStepsOptions, setDropdownStepsOptions] = React.useState<any[]>(
    []
  );

  const _getProjectManager = (props: IUser[]): void => {
    setSelectedManager(props);
  };
  const _getResponsibleManager = (props: IUser[]): void => {
    setSelectedResponsibleManager(props);
  };
  const _getProjectMembers = (props: IUser[]): void => {
    setSelectedProjectMembers(props);
  };
  const [selectedKeyResources, setSelectedKeyResources] = React.useState<
    string | undefined
  >(() => getStatusChoiceGroup(project.Resources));

  const [selectedKeyTime, setSelectedKeyTime] = React.useState<
    string | undefined
  >(() => getStatusChoiceGroup(project.Time));

  const [selectedKeyBudget, setSelectedKeyBudget] = React.useState<
    string | undefined
  >(() => getStatusChoiceGroup(project.Budget));

  const peoplePickerContext: IPeoplePickerContext = {
    absoluteUrl: context.pageContext.web.absoluteUrl,
    msGraphClientFactory: context.msGraphClientFactory,
    spHttpClient: context.spHttpClient,
  };

  React.useEffect(() => {
    if (project) {
      setSelectedProjectId(project.ID);
      setTitleValue(project.Title);
      setCustomerValue(project.Customer);
      setProjectManager([project.ProjectManager]);
      setResponsibleManager([project.ProjectLeader]);
      setprojectMembers(
        project.ProjectMembers.map((members: IUser) => {
          return members.Title;
        })
      );
      setBudgetValue(project.Budget);
      setTimeValue(project.Time);
      setResourcesValue(project.Resources);
      setSelectedKeyResources(getStatusChoiceGroup(project.Resources));
      setSelectedKeyTime(getStatusChoiceGroup(project.Time));
      setSelectedKeyBudget(getStatusChoiceGroup(project.Budget));
      setStepsOptions(project.Faser);
      setProjectTypeOptions(project.ProjectType);
    }
  }, [project]);

  React.useEffect(() => {
    setIsEditing(onEdit);
  }, [onEdit]);

  React.useEffect(() => {
    const dropdownOptions = projectTypes.map((option: any) => ({
      key: option.Id,
      text: option.Title,
    }));

    setDropdownProjectTypeOptions(dropdownOptions);
  }, [projectTypes]);

  React.useEffect(() => {
    const dropdownOptions = steps.map((option: any) => ({
      key: option.Id,
      text: option.Title,
    }));

    setDropdownStepsOptions(dropdownOptions);
  }, [projectTypes]);

  const onChangeChoiceGroupSteps = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      const selectedStep = {
        ID: option.key,
        Title: option.text,
      };
      setStepsOptions(selectedStep);
    },
    []
  );
  const onChangeChoiceGroupTime = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedKeyTime(option.key);
      setTimeValue(option.text);
    },
    []
  );
  const onChangeChoiceGroupResources = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedKeyResources(option.key);
      setResourcesValue(option.text);
    },
    []
  );
  const onChangeChoiceGroupBudget = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedKeyBudget(option.key);
      setBudgetValue(option.text);
    },
    []
  );
  const _onTitleTextFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: any
  ): void => {
    console.log("Title Value Changed:", newValue); // Logga för felsökning
    setTitleValue(newValue);
  };
  const _onCustomerTextFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: any
  ): void => {
    console.log("Customer Value Changed:", newValue); // Logga för felsökning
    setCustomerValue(newValue);
  };
  const _onselectedProjectTypeOptionsChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ): void => {
    setProjectTypeOptions(option);
  };
  const handleClose = React.useCallback(() => {
    setIsEditing(false);
    closePanel();
  }, []);
  const normalizeUserObject = (user: any): IUser => {
    return {
      ID: user.ID || user.Id || user.id,
      EMail: user.EMail || user.secondaryText || user.loginName,
      Title: user.Title || user.text,
    };
  };
  const normalizeUserMembersObject = (user: any): IUser => {
    const userData = user.data || {}; // Access the `data` object
    return {
      ID: userData.ID || userData.Id || userData.id || null,
      EMail:
        userData.Email ||
        userData.UserPrincipalName ||
        userData.secondaryText ||
        userData.LoginName ||
        null,
      Title: userData.Title || user.text || null,
    };
  };
  const areUsersDifferent = (users1: any[], users2: any[]): boolean => {
    if (users1.length !== users2.length) return true;

    for (let i = 0; i < users1.length; i++) {
      if (users1[i].ID !== users2[i].ID) {
        return true;
      }
    }
    return false;
  };
  const ensureAndNormalizeUsers = async (
    enteredProjectMembers: any[]
  ): Promise<IUser[]> => {
    const promises = enteredProjectMembers.map(async (member) => {
      let user;
      if (typeof member === "string") {
        user = await sp.web.ensureUser(member || "");
      } else if (typeof member === "object" && member !== null) {
        // If member is an object, check if it has `secondaryText`
        user = await sp.web.ensureUser(member.secondaryText || "");
      } else {
        // Handle case if member is neither a string nor an object
        console.error("Invalid member type", member);
        return null; // Or throw an error, depending on your needs
      }
      return normalizeUserMembersObject(user);
    });
    const results = await Promise.all(promises);
    return results.filter((user): user is IUser => user !== null);
  };
  const ensureAndNormalizeProjectMembers = async (
    selectedProjectMembers: any[],
    projectMembers: any[]
  ): Promise<IUser[]> => {
    const membersToProcess =
      selectedProjectMembers.length > 0 &&
      areUsersDifferent(selectedProjectMembers, projectMembers)
        ? selectedProjectMembers
        : projectMembers;

    return ensureAndNormalizeUsers(membersToProcess);
  };
  const handleSave = async (): Promise<void> => {
    setIsEditing(false);
    closePanel();

    const enteredProjectManager =
      selectedManager.length === 0
        ? normalizeUserObject(projectManager[0])
        : normalizeUserObject(selectedManager[0]);
    const selectedProjectManager = await sp.web.ensureUser(
      enteredProjectManager.Title || ""
    );

    const enteredResponsibleManager =
      selectedResponsibleManager.length === 0
        ? normalizeUserObject(responsibleManager[0])
        : normalizeUserObject(selectedResponsibleManager[0]);

    const selectedResManager = await sp.web.ensureUser(
      enteredResponsibleManager.Title || ""
    );

    const normalizedProjectMembers = await ensureAndNormalizeProjectMembers(
      selectedProjectMembers,
      projectMembers
    );

    const selectedProjMembers: string[] = normalizedProjectMembers.map(
      (members) => {
        return members.ID;
      }
    );
    const selectedProjMembersForUpdate: IUser[] = normalizedProjectMembers.map(
      (members) => {
        return members;
      }
    );
    const enteredTitle = titleValue;
    const enteredCustomer = customerValue;
    const enteredResources = resourcesValue;
    const enteredTime = timeValue;
    const enteredBudget = budgetValue;
    const enteredStepID = stepsOptions.ID;
    const enteredStep = stepsOptions;
    const enteredProjectTypeID = projectTypeOptions.ID;
    const enteredProjectType = projectTypeOptions;

    const updateProject = {
      Title: enteredTitle,
      Customer: enteredCustomer,
      ProjectTypeId: enteredProjectTypeID,
      ProjectManagerId: selectedProjectManager.data.Id,
      ProjectLeaderId: selectedResManager.data.Id,
      ProjectMembersId: selectedProjMembers,
      FaserId: enteredStepID,
      Resources: enteredResources,
      Time: enteredTime,
      Budget: enteredBudget,
    };

    const selectedProject = {
      Title: enteredTitle,
      Customer: enteredCustomer,
      ProjectType: enteredProjectType,
      ProjectManager: selectedProjectManager.data,
      ProjectLeader: selectedResManager.data,
      ProjectMembers: selectedProjMembersForUpdate,
      Faser: enteredStep,
      Resources: enteredResources,
      Time: enteredTime,
      Budget: enteredBudget,
      ID: selectedProjectId,
    };
    try {
      await onUpdateProject(updateProject, selectedProjectId, context);
      updateSelectedProject(selectedProject);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <>
      {isEditing && (
        <EditPanel
          edit={onEdit}
          onClose={() => handleClose()}
          onSave={() => handleSave()}
        >
          <div className="w-4/4 mt-4">
            <div>
              <TextField
                label="Rubrik"
                // errorMessage="Error message"
                required={true}
                value={titleValue}
                onChange={_onTitleTextFieldChange}
              />
              <TextField
                label="Kund"
                required={true}
                value={customerValue}
                onChange={_onCustomerTextFieldChange}
              />
              <Dropdown
                placeholder="välj projekttyp"
                label="Projekttyp"
                options={dropdownProjectTypeOptions}
                //selectedKey={selectedOption.ID}
                onChange={_onselectedProjectTypeOptionsChange}
                required={true}
                defaultSelectedKey={projectTypeOptions.ID}
                //defaultValue={editProject.projectTypeTitle}
                // onChange={dropdownOpt}
              />
              <PeoplePicker
                context={peoplePickerContext}
                titleText="Projektansvarig"
                personSelectionLimit={2}
                showtooltip={true}
                required={true}
                defaultSelectedUsers={[projectManager[0]?.Title || ""]}
                onChange={_getProjectManager}
                //showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                //defaultSelectedUsers={this.state.selectedUsers}
                resolveDelay={1000}
              />
              <PeoplePicker
                context={peoplePickerContext}
                titleText="Projektledare"
                personSelectionLimit={1}
                //showtooltip={true}
                required={true}
                defaultSelectedUsers={[responsibleManager[0]?.Title || ""]}
                onChange={_getResponsibleManager}
                //showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                //defaultSelectedUsers={this.state.selectedUsers}
                resolveDelay={1000}
              />
              <PeoplePicker
                context={peoplePickerContext}
                titleText="Projektmedlemmar"
                personSelectionLimit={10}
                //showtooltip={true}
                required={true}
                defaultSelectedUsers={projectMembers}
                onChange={_getProjectMembers}
                //showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                //defaultSelectedUsers={this.state.selectedUsers}
                resolveDelay={1000}
              />
              <div className={Styles.choice_group_container}>
                <div className={Styles.choice_group_item}>
                  <ChoiceGroup
                    selectedKey={selectedKeyResources}
                    options={options}
                    onChange={onChangeChoiceGroupResources}
                    label="Resources"
                  />
                </div>
                <div className={Styles.choice_group_item}>
                  <ChoiceGroup
                    selectedKey={selectedKeyTime}
                    options={options}
                    onChange={onChangeChoiceGroupTime}
                    label="Time"
                  />
                </div>
                <div className={Styles.choice_group_item}>
                  <ChoiceGroup
                    selectedKey={selectedKeyBudget}
                    options={options}
                    onChange={onChangeChoiceGroupBudget}
                    label="Budget"
                  />
                </div>
              </div>
              <div className={Styles.choice_group_container}>
                <div className={Styles.choice_group_item}>
                  <ChoiceGroup
                    selectedKey={stepsOptions.ID}
                    options={dropdownStepsOptions}
                    onChange={onChangeChoiceGroupSteps}
                    label="Progress steps"
                  />
                </div>
              </div>
              {/* <div>
            <Button onClick={handleSave}>save</Button>
          </div> */}
            </div>
          </div>
        </EditPanel>
      )}
    </>
  );
};
