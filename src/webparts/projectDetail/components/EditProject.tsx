import * as React from "react";
import { IProjectDetailProps } from "./IProjectDetailProps";
import { Modal } from "./UI/Modal";
//import { spfi, SPFx } from "@pnp/sp";
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
import { IUser } from "./models/IUser";

const options: IChoiceGroupOption[] = [
  { key: "1", text: "Low" },
  { key: "2", text: "Medium" },
  { key: "3", text: "High" },
];

export const EditProject: React.FC<IProjectDetailProps> = ({
  project,
  projectTypes,
  context,
}) => {
  const modalRef = React.useRef<any>(null);
  // const sp = spfi().using(SPFx(context));
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
  const [selectedKeyResources, setSelectedKeyResources] = React.useState<
    string | undefined
  >(() => getStatusChoiceGroup(project.Resources));
  const [selectedKeyTime, setSelectedKeyTime] = React.useState<
    string | undefined
  >(() => getStatusChoiceGroup(project.Time));
  const [selectedKeyBudget, setSelectedKeyBudget] = React.useState<
    string | undefined
  >(() => getStatusChoiceGroup(project.Budget));

  const onChangeChoiceGroupTime = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedKeyTime(option.key);
    },
    []
  );
  const onChangeChoiceGroupResources = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedKeyResources(option.key);
    },
    []
  );
  const onChangeChoiceGroupBudget = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedKeyBudget(option.key);
    },
    []
  );

  const peoplePickerContext: IPeoplePickerContext = {
    absoluteUrl: context.pageContext.web.absoluteUrl,
    msGraphClientFactory: context.msGraphClientFactory,
    spHttpClient: context.spHttpClient,
  };
  console.log(peoplePickerContext);

  const editProject = {
    projectID: project.ID,
    title: project.Title,
    customer: project.Customer,
    projectManager: [project.ProjectManager.Title],
    projectLeader: [project.ProjectLeader.Title],
    projectMembers: project.ProjectMembers.map((members: any) => {
      return members.Title;
    }),
    projectTypeID: project.ProjectType.ID,
    resources: project.Resources,
    time: project.Time,
    budget: project.Budget,
  };

  const [titleValue, setTitleValue] = React.useState<string>("");
  const [customerValue, setCustomerValue] = React.useState<string>("");
  const [projectManager, setProjectManager] = React.useState<IUser[]>([]);
  const [responsibleManager, setResponsibleManager] = React.useState<IUser[]>(
    []
  );

  const [projectMembers, setprojectMembers] = React.useState<IUser[]>([]);

  const [dropdownOption, setDropdownOption] = React.useState<IDropdownOption[]>(
    []
  );
  const [selectedOption, setSelectedOption] = React.useState<any>(
    !editProject.projectTypeID ? null : editProject.projectTypeID
  );

  React.useEffect(() => {
    const dropdownOptions = projectTypes.map((option: any) => ({
      key: option.Id,
      text: option.Title,
    }));

    setDropdownOption(dropdownOptions);
  }, [projectTypes]);

  const _onOptionsChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ): void => {
    setSelectedOption(option?.key);
  };
  //   React.useEffect(() => {
  //     const dropdownOptions = projectTypes.map((option: any) => ({
  //       key: option.Id,
  //       text: option.Title,
  //     }));

  //     setDropdownOption(dropdownOptions);
  //   }, [projectTypes]);

  //   const _onOptionsChange = (
  //     event: React.FormEvent<HTMLDivElement>,
  //     option?: IDropdownOption,
  //     index?: number
  //   ): void => {
  //     setSelectedOption(option?.key);
  //   };

  const _getProjectManager = (props: IUser[]): void => {
    setProjectManager(props);
  };
  const _getResponsibleManager = (props: IUser[]): void => {
    setResponsibleManager(props);
  };
  const _getProjectMembers = (props: IUser[]): void => {
    setprojectMembers(props);
  };
  const _onTitleTextFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: any
  ): void => {
    setTitleValue(newValue);
  };
  const _onCustomerTextFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: any
  ): void => {
    setCustomerValue(newValue);
  };

  //   const handleSave = async (): Promise<void> => {
  //     const enteredTitle = titleValue ? titleValue : "";
  //     const enteredCustomer = customerValue ? customerValue : "";
  //     const enteredProjectType = selectedOption ? selectedOption : "";
  //     const enteredProjectManager = projectManager ? projectManager[0].id : "";
  //     const enteredResponsibleManager = responsibleManager
  //       ? responsibleManager[0].id
  //       : "";
  //     const selectedMember: string[] = [];
  //     projectMembers.map(async (items: IUser) => {
  //       const user: any = await sp.web.ensureUser(items.id);
  //       selectedMember.push(user.data.Id);
  //     });

  //     if (
  //       enteredTitle.trim() === "" ||
  //       enteredCustomer.trim() === "" ||
  //       enteredProjectType === "" ||
  //       enteredCustomer.trim() === ""
  //       //   enteredProjectManager === "" ||
  //       //   enteredResponsibleManager === "" ||
  //       //   enteredMembers === ""
  //     ) {
  //       if (modalRef.current) {
  //         modalRef.current.open();
  //       }
  //       return;
  //     }
  //     const selectedProjectManager = await sp.web.ensureUser(
  //       enteredProjectManager
  //     );
  //     const selectedResponsibleManager = await sp.web.ensureUser(
  //       enteredResponsibleManager
  //     );

  //     const newProject = {
  //       title: enteredTitle,
  //       customer: enteredCustomer,
  //       projectType: enteredProjectType,
  //       manager: selectedProjectManager.data.Id,
  //       responsibleManager: selectedResponsibleManager.data.Id,
  //       members: selectedMember,
  //     };
  //     console.log(newProject);

  //     // if (onAddProject) {
  //     //   onAddProject(newProject);
  //     // }
  //   };
  console.log(
    customerValue,
    titleValue,
    projectManager,
    responsibleManager,
    projectMembers,
    editProject,
    context
  );

  return (
    <>
      <Modal ref={modalRef}>
        <h2 className="text-xl font-bold text-gray-700 my-2">Invalid input</h2>
        <p className="text-gray-600 ">
          Oops... lokks like you have forgot to enter a value
        </p>
        <p className="text-gray-600 ">
          Please make sure you provide a valid value for every input field
        </p>
      </Modal>
      <div className="w-4/4 mt-4">
        <div>
          <TextField
            label="Rubrik"
            // errorMessage="Error message"
            required={true}
            value={editProject.title}
            onChange={_onTitleTextFieldChange}
          />
          <TextField
            label="Kund"
            required={true}
            value={editProject.customer}
            onChange={_onCustomerTextFieldChange}
          />
          <Dropdown
            placeholder="välj projekttyp"
            label="Projekttyp"
            options={dropdownOption}
            selectedKey={selectedOption}
            onChange={_onOptionsChange}
            required={true}
            defaultSelectedKey={selectedOption}
            //defaultValue={editProject.projectTypeTitle}
            // onChange={dropdownOpt}
          />
          <PeoplePicker
            context={peoplePickerContext}
            titleText="Projektledare"
            personSelectionLimit={2}
            showtooltip={true}
            required={true}
            defaultSelectedUsers={editProject.projectManager}
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
            defaultSelectedUsers={editProject.projectLeader}
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
          <div className="h-56 mt-8 grid grid-cols-3 gap-4 content-start ...">
            <div>
              <ChoiceGroup
                selectedKey={selectedKeyResources}
                options={options}
                onChange={onChangeChoiceGroupResources}
                label="Resources"
              />
            </div>
            <div>
              <ChoiceGroup
                selectedKey={selectedKeyTime}
                options={options}
                onChange={onChangeChoiceGroupTime}
                label="Time"
              />
            </div>
            <div>
              <ChoiceGroup
                selectedKey={selectedKeyBudget}
                options={options}
                onChange={onChangeChoiceGroupBudget}
                label="Budget"
              />
            </div>
          </div>
          {/* <div className={styles.buttonWrapper}>
                <PrimaryButton
                  text="Skapa projekt"
                  disabled={
                    !titleValue || !customerValue || !optValue
                    //||
                    // !projectManager.map((items: IUser) =>{return items.Id})[0] ||
                    // !responsibleManager.map((items: IUser) =>{return items.Id})[0] ||
                    // !projectMembers.map((items: IUser) =>{return items.Id})[0]
                  }
                  onClick={onSaveProject}
                />
              </div> */}
        </div>
      </div>
    </>
  );
};
