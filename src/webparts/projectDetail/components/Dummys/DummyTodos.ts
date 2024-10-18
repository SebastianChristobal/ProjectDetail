export interface Todo {
  projectId: number;
  title: string;
  projectTitle: string;
  description: string;
  contentTypeName: string;
  ongoing: boolean;
}

export const DummyActivities: Todo[] = [
  {
    projectId: 1,
    title: "Comprehensive Market Research",
    projectTitle: "Project A",
    description: "This activity involves conducting an in-depth market analysis to understand the target audience, competitors, and current trends. The research will encompass both qualitative and quantitative methods, including surveys, interviews, and data analysis. Our goal is to gather insights that will inform product positioning and marketing strategies. This phase will also explore emerging opportunities and potential threats in the industry.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 2,
    title: "Product Development Workshop",
    projectTitle: "Project B",
    description: "This activity is focused on an intensive, collaborative workshop where cross-functional teams will come together to brainstorm, prototype, and iterate on new product features. The workshop will cover initial ideation, user feedback integration, and rapid prototyping techniques to ensure the product meets customer needs. The goal is to refine the product roadmap and prioritize features for upcoming releases.",
    contentTypeName: 'Aktivitet',
    ongoing: false
  },
  {
    projectId: 3,
    title: "User Experience (UX) Improvement Sprint",
    projectTitle: "Project C",
    description: "This activity is dedicated to enhancing the overall user experience of our product. Through a focused sprint, the team will analyze user journey data, gather feedback from customer support, and perform usability tests. The outcomes of this sprint will lead to improved user interfaces, faster navigation, and an overall smoother experience, all aimed at increasing customer satisfaction and retention.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 44,
    title: "Digital Marketing Campaign Planning",
    projectTitle: "Project D",
    description: "In this activity, the marketing team will strategize and plan a comprehensive digital marketing campaign. The activity includes defining target demographics, selecting appropriate channels (such as social media, email marketing, and search engine optimization), and crafting compelling content. The goal is to increase brand awareness, drive traffic to the website, and generate leads over the next quarter.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 45,
    title: "Stakeholder Engagement & Feedback Session",
    projectTitle: "Project E",
    description: "This activity is designed to involve key stakeholders in the decision-making process. Through a series of engagement sessions, stakeholders will provide valuable feedback on the project’s current direction, its challenges, and future opportunities. These sessions will also address any concerns and align expectations across the board, ensuring that all parties are on the same page regarding project objectives and timelines.",
    contentTypeName: 'Aktivitet',
    ongoing: false
  },
  {
    projectId: 1,
    title: "Dummy Activity 6",
    projectTitle: "Project F",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 2,
    title: "Dummy Activity 7",
    projectTitle: "Project G",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 3,
    title: "Dummy Activity 8",
    projectTitle: "Project H",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: false
  },
  {
    projectId: 44,
    title: "Dummy Activity 9",
    projectTitle: "Project I",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 45,
    title: "Dummy Activity 10",
    projectTitle: "Project J",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: false
  },
  {
    projectId: 1,
    title: "Dummy Activity 11",
    projectTitle: "Project K",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 2,
    title: "Dummy Activity 12",
    projectTitle: "Project L",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: false
  },
  {
    projectId: 3,
    title: "Dummy Activity 13",
    projectTitle: "Project M",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 44,
    title: "Dummy Activity 14",
    projectTitle: "Project N",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 45,
    title: "Dummy Activity 15",
    projectTitle: "Project O",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: false
  },
  {
    projectId: 1,
    title: "Dummy Activity 16",
    projectTitle: "Project P",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 2,
    title: "Dummy Activity 17",
    projectTitle: "Project Q",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 3,
    title: "Dummy Activity 18",
    projectTitle: "Project R",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: false
  },
  {
    projectId: 44,
    title: "Dummy Activity 19",
    projectTitle: "Project S",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: true
  },
  {
    projectId: 45,
    title: "Dummy Activity 20",
    projectTitle: "Project T",
    description: "This is a dummy activity description.",
    contentTypeName: 'Aktivitet',
    ongoing: false
  }
];
  // Add more todos as needed

export const DummyControlpoints: Todo[] = [
  {
    projectId: 1,
    title: "Implement User Authentication",
    projectTitle: "Project Chile",
    description: "Develop a robust user authentication system using modern encryption techniques and secure authentication protocols. Ensure seamless integration with existing user management systems and provide comprehensive documentation.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 2,
    title: "Optimize Database Queries",
    projectTitle: "Project Isla pao pao",
    description: "Analyze database performance and identify bottlenecks in query execution. Implement optimizations such as index tuning, query rewriting, and database schema redesign to improve overall system responsiveness and reduce latency.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 2,
    title: "Enhance User Interface",
    projectTitle: "Project Chile",
    description: "Revamp the user interface to enhance usability and user experience. Incorporate modern design principles, intuitive navigation patterns, and responsive layouts to create a visually appealing and user-friendly interface.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 3,
    title: "Implement Payment Gateway Integration",
    projectTitle: "Power Project",
    description: "Integrate a third-party payment gateway to facilitate secure and seamless online transactions. Ensure compliance with industry standards and regulations, and implement robust error handling and logging mechanisms.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 45,
    title: "Control Point 1",
    projectTitle: "Project A",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 2,
    title: "Control Point 2",
    projectTitle: "Project B",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 3,
    title: "Control Point 3",
    projectTitle: "Project C",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 1,
    title: "Control Point 4",
    projectTitle: "Project D",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 44,
    title: "Control Point 5",
    projectTitle: "Project E",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 1,
    title: "Control Point 6",
    projectTitle: "Project F",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 45,
    title: "Control Point 7",
    projectTitle: "Project G",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 3,
    title: "Control Point 8",
    projectTitle: "Project H",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 1,
    title: "Control Point 9",
    projectTitle: "Project I",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 44,
    title: "Control Point 10",
    projectTitle: "Project J",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 2,
    title: "Control Point 11",
    projectTitle: "Project K",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 1,
    title: "Control Point 12",
    projectTitle: "Project L",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 45,
    title: "Control Point 13",
    projectTitle: "Project M",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 3,
    title: "Control Point 14",
    projectTitle: "Project N",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  },
  {
    projectId: 44,
    title: "Control Point 15",
    projectTitle: "Project O",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: true
  },
  {
    projectId: 2,
    title: "Control Point 16",
    projectTitle: "Project P",
    description: "This is a dummy control point description.",
    contentTypeName: 'Kontrollpunkt',
    ongoing: false
  }
];