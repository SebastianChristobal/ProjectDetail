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
  const [editProject, setEditProject] = React.useState<any | undefined>(
    undefined
  );
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
  const [projectMembers, setprojectMembers] = React.useState<IUser[]>([]);
  const [selectedProjectMembers, setSelectedProjectMembers] = React.useState<
    IUser[]
  >([]);
  const [dropdownOption, setDropdownOption] = React.useState<IDropdownOption[]>(
    []
  );
  const [dropdownStepsOption, setDropdownStepsOption] = React.useState<any[]>(
    []
  );
  const [selectedOption, setSelectedOption] = React.useState<any>(
    project.ProjectType
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

  const [selectedKeySteps, setSelectedKeySteps] = React.useState<
    string | undefined
  >(() => project.Faser.Title);

  const peoplePickerContext: IPeoplePickerContext = {
    absoluteUrl: context.pageContext.web.absoluteUrl,
    msGraphClientFactory: context.msGraphClientFactory,
    spHttpClient: context.spHttpClient,
  };

  React.useEffect(() => {
    if (project) {
      // Skapa objektet och sätt det i state
      const newEditProject: any = {
        projectID: project.ID,
        title: project.Title,
        customer: project.Customer,
        projectManager: [project.ProjectManager],
        projectLeader: [project.ProjectLeader],
        projectMembers: project.ProjectMembers.map((members: IUser) => {
          return members.Title;
        }),
        projectType: project.ProjectType,
        resources: project.Resources,
        time: project.Time,
        budget: project.Budget,
        steps: project.Faser,
      };

      setEditProject(newEditProject);
      setTitleValue(newEditProject.title);
      setCustomerValue(newEditProject.customer);
      setProjectManager(newEditProject.projectManager);
      setResponsibleManager(newEditProject.projectLeader);
      setprojectMembers(newEditProject.projectMembers);
      setBudgetValue(newEditProject.budget);
      setTimeValue(newEditProject.time);
      setResourcesValue(newEditProject.resources);
      setSelectedKeyResources(getStatusChoiceGroup(newEditProject.resources));
      setSelectedKeyTime(getStatusChoiceGroup(newEditProject.time));
      setSelectedKeyBudget(getStatusChoiceGroup(newEditProject.budget));
      setSelectedKeySteps(project.Faser.ID);
      setSelectedOption(newEditProject.projectType);
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

    setDropdownOption(dropdownOptions);
  }, [projectTypes]);

  React.useEffect(() => {
    const dropdownOptions = steps.map((option: any) => ({
      key: option.Id,
      text: option.Title,
    }));

    setDropdownStepsOption(dropdownOptions);
  }, [projectTypes]);
  const onChangeChoiceGroupSteps = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedKeySteps(option.key);
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

  const _onOptionsChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ): void => {
    setSelectedOption(option?.key);
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
        user.secondaryText ||
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
      const user = await sp.web.ensureUser(
        member.secondaryText || "default@domain.com"
      );
      console.log("ensureUser result:", user);
      return normalizeUserMembersObject(user);
    });

    return Promise.all(promises);
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
    const enteredTitle =
      titleValue.trim() !== "" ? titleValue : editProject.title;

    const enteredCustomer =
      customerValue.trim() !== "" ? customerValue : editProject.customer;

    const enteredProjectType = selectedOption.ID || editProject.projectType.ID;

    const enteredProjectManager =
      selectedManager.length === 0
        ? normalizeUserObject(projectManager[0])
        : normalizeUserObject(selectedManager[0]);
    const selectedProjectManager = await sp.web.ensureUser(
      enteredProjectManager.Title || "default@domain.com"
    );

    const enteredResponsibleManager =
      selectedResponsibleManager.length === 0
        ? normalizeUserObject(responsibleManager[0])
        : normalizeUserObject(selectedResponsibleManager[0]);

    const selectedResManager = await sp.web.ensureUser(
      enteredResponsibleManager.Title || "default@domain.com"
    );

    const normalizedProjectMembers = await ensureAndNormalizeProjectMembers(
      selectedProjectMembers,
      projectMembers
    );

    const selectedProjMembers = normalizedProjectMembers;
    console.log(selectedProjMembers);
    const enteredResources = resourcesValue || editProject.resources;
    const enteredTime = timeValue || editProject.time;
    const enteredBudget = budgetValue || editProject.budget;
    //const enteredSteps = selectedKeySteps || editProject.steps.Title;

    // const selectedProjectMembers = await Promise.all(
    //   enteredProjectMembers.map(async (member: any) => {
    //     const user = await sp.web.ensureUser(member);
    //     return user.data.Email;
    //   })
    // );

    console.log(
      // enteredResources,
      // enteredTime,
      // enteredBudget,
      enteredProjectType
    );
    const newProject = {
      Title: enteredTitle,
      Customer: enteredCustomer,
      //ProjectType: { ID: enteredProjectType },
      ProjectManagerId: selectedProjectManager.data.Id,
      ProjectLeaderId: selectedResManager.data.Id,
      ProjectMembers: selectedProjMembers.map((members) => {
        return members.ID;
      }),
      // //Faser: Number(enteredSteps),
      Resources: enteredResources,
      Time: enteredTime,
      Budget: enteredBudget,
    };

    try {
      await onUpdateProject(newProject, editProject.projectID, context);
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
                options={dropdownOption}
                //selectedKey={selectedOption.ID}
                onChange={_onOptionsChange}
                required={true}
                defaultSelectedKey={selectedOption.ID}
                //defaultValue={editProject.projectTypeTitle}
                // onChange={dropdownOpt}
              />
              <PeoplePicker
                context={peoplePickerContext}
                titleText="Projektledare"
                personSelectionLimit={2}
                showtooltip={true}
                required={true}
                defaultSelectedUsers={[editProject.projectManager[0].EMail]}
                onChange={_getProjectManager}
                //showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                //defaultSelectedUsers={this.state.selectedUsers}
                resolveDelay={1000}
              />
              <PeoplePicker
                context={peoplePickerContext}
                titleText="Projektansvarig"
                personSelectionLimit={1}
                //showtooltip={true}
                required={true}
                defaultSelectedUsers={[editProject.projectLeader[0].EMail]}
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
                defaultSelectedUsers={editProject.projectMembers}
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
                    selectedKey={selectedKeySteps}
                    options={dropdownStepsOption}
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
