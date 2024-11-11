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
  onEdit?:any;
  isTextArea?:boolean;
  type?:any;
  className?:any;
  projects?:any;
  initialProjects?:any;
  project?:any;
  tasks?:any;
  steps?:any;
  activities?:any;
  filteredActivities?:any;
  filteredControlPoints?:any;
  controlPoints?:any;
  deleteTask?:any;
  selectedProject?:any;
  selectedProjectId?:any;
  selectedObjectId?:any;
  projectTypes?: any;
  closePanel?: any;
  updateSelectedProject?: any;
  onAddNewProject?:(query: any) => void;
  onAddProject?:(query: any) => void;
  onCancelAddProject?:(query: any) => void;
  onSave?:(query?: any) => void;
  onClick?:(query: any) => void;

}
