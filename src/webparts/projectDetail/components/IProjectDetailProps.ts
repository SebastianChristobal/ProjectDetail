export interface IProjectDetailProps {
  description?: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  context?:any;
  ref?:any;
  label?:string;
  edit?: any;
  onClose?:any;
  isTextArea?:boolean;
  type?:any;
  className?:any;
  projects?:any;
  initialProjects?:any;
  project?:any;
  tasks?:any;
  faser?:any;
  activities?:any;
  filteredActivities?:any;
  filteredControlPoints?:any;
  controlPoints?:any;
  deleteTask?:any;
  selectedProject?:any;
  selectedProjectId?:any;
  selectedObjectId?:any;
  projectTypes?: any;
 
  onAddNewProject?:(query: any) => void;
  onAddProject?:(query: any) => void;
  onCancelAddProject?:(query: any) => void;
  handleSave?:(query: any) => void;
  onClick?:(query: any) => void;
}
