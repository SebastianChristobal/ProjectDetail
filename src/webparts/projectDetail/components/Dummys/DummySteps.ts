


export interface Steps{
    id?:number;
    title:string;
    description:string;
    isActive: boolean;
}


export const progressSteps: Steps[] = [
    {
        title: "Initiate Project",
        description: "Kickstart the project by defining project objectives, scope, and stakeholders. Establish project governance, allocate resources, and set up communication channels. Create a project charter and obtain approval from key stakeholders.",
        id: 1,
        isActive: false,
    },
    {
        title: "Execute Project Plan",
        description: "Implement the project plan according to the defined scope, schedule, and budget. Assign tasks to team members, monitor progress, and track milestones. Address any deviations from the plan and ensure adherence to project timelines.",
        id: 2,
        isActive: false,
    },
    {
        title: "Monitor Project Progress",
        description: "Regularly track project performance against established metrics and key performance indicators (KPIs). Identify potential risks and issues, and take proactive measures to mitigate them. Communicate progress updates to stakeholders and adjust project plans as needed.",
        id: 3,
        isActive: true,
    },
    {
        title: "Perform Quality Assurance",
        description: "Conduct comprehensive quality assurance activities to ensure deliverables meet predefined quality standards and client requirements. Perform testing, reviews, and inspections to identify defects and ensure product reliability and customer satisfaction.",
        id: 4,
        isActive: false,
    },
    {
        title: "Close Project",
        description: "Conclude the project by completing all deliverables, obtaining final acceptance from the client, and releasing project resources. Conduct a project review to evaluate performance, capture lessons learned, and identify areas for improvement.",
        id: 5,
        isActive: false,
    }
];