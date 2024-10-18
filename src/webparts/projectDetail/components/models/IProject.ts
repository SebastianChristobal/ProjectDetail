export interface IProject{
    Id?: number;
    Title?: string;
    Author?:string;
    ProjectType?: any;
    ProjectTypeId?: number;
    ProjectLeader?:any;
    ProjectLeaderId?: any;
    ProjectManager?:any;
    ProjectManagerId?: any;
    ProjectMembers?:any;
    ProjectMembersId?: any;
    Customer?: string;
    ProjectImage?: string;
    Status?: string;
    ContentType?: any;
    AbsoluteSiteUrl?: string;
    Budget?: string;
    Time?: string;
    Resources?: string;
    Faser?: Faser;
    FaserId?: number;
}

export interface Faser{
    ID?: number;
    Title?: string;
}