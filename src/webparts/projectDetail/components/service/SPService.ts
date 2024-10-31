import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/site-users/web";
import "@pnp/sp/profiles";  
import { IItemAddResult } from "@pnp/sp/items";
import { spfi, SPFx } from "@pnp/sp";
import { IProjectDetailProps } from "../IProjectDetailProps";


export const fetchProjects = async (props?: IProjectDetailProps): Promise<any[]> => {
    const sp = spfi().using(SPFx(props?.context));
    
    if (!props || !props.context || !props.context.msGraphClientFactory) {
        throw new Error("Props or props.context or props.context.msGraphClientFactory is undefined.");
    }

    try {
        const projects = await sp.web.lists.getByTitle("Projekt").items
            .select(
                'Id',    
                'Title', 
                'ProjectType/Title',
                'ProjectType/ID',
                'Customer',
                'ProjectManager/Title',
                'ProjectManager/ID',
                'ProjectManager/EMail',
                'ProjectMembers/Title',
                'ProjectMembers/ID',
                'ProjectLeader/Title',
                'ProjectLeader/ID',
                'ProjectLeader/EMail',
                'ProjectImage',
                'Resources',
                'Time',
                'Budget',
                'Status',
                'Faser/Title',
                'Faser/ID',
                'Author/Title'

            )
            .expand('ProjectManager', 'ProjectLeader', 'ProjectType', 'ProjectMembers','Author','Faser')
            .orderBy('Modified', true)
            .getAll();
            console.log(projects);
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}


export const fetchProjectTypes = async (props: IProjectDetailProps): Promise<any> => {
    const sp = spfi().using(SPFx(props.context));
    if (!props || !props.context || !props.context.msGraphClientFactory) {
        throw new Error("Props or props.context or props.context.msGraphClientFactory is undefined.");
    }

    try{
        const items = await sp.web.lists.getByTitle("ProjektTyp").items();
        return items;
    }catch (error) {
        console.error(error);
    }
}
export const fetchFaser = async (props: IProjectDetailProps): Promise<any> => {
    const sp = spfi().using(SPFx(props.context));
    if (!props || !props.context || !props.context.msGraphClientFactory) {
        throw new Error("Props or props.context or props.context.msGraphClientFactory is undefined.");
    }

    try{
        const items = await sp.web.lists.getByTitle("Faser").items();
        return items;
    }catch (error) {
        console.error(error);
    }
}

export const onSaveProject = async ( projectData: any, context: any): Promise<any> => {
    const sp = spfi().using(SPFx(context));

    if (!context  || !context.msGraphClientFactory) {
        throw new Error("Props or props.context or props.context.msGraphClientFactory is undefined.");
    }

    const data = projectData;
    try{
        const iar: IItemAddResult = await sp.web.lists.getByTitle("Projekt").items.add(data);
        console.log(iar);
       }
   catch(error){
       console.error(error);
       }
}
export const onUpdateProject = async ( projectData: any, projectID: number, context: any): Promise<any> => {
    const sp = spfi().using(SPFx(context));

    if (!context  || !context.msGraphClientFactory) {
        throw new Error("Props or props.context or props.context.msGraphClientFactory is undefined.");
    }
    console.log(projectData);
    const data = projectData;
    try{
        const projectId = projectID;
        const list = sp.web.lists.getByTitle("Projekt");
        const iar: IItemAddResult = await list.items.getById(projectId).update(data);
        console.log(iar);
       }
   catch(error){
       console.error(error);
       }
}

