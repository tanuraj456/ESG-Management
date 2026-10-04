
export const companyInfo = {
    name: "EcoSphere Technologies",
    industry: "Technology & Software",
    location: "Jaipur, Rajasthan",
    totalEmployees: 248,
    totalDepartments: 8,
    foundedYear: 2018,
    esgRating: "A",
  };
  
  // ----------------------------------
  // ADMIN DASHBOARD DATA
  // ----------------------------------
  
  export const adminStats = [
    {
      id: 1,
      title: "Total Employees",
      value: "248",
      change: "+12.5%",
      trend: "up",
      description: "Across 8 departments",
      iconName: "Users",
    },
    {
      id: 2,
      title: "Overall ESG Score",
      value: "86.4",
      change: "+8.2%",
      trend: "up",
      description: "Excellent performance",
      iconName: "Leaf",
    },
    {
      id: 3,
      title: "Carbon Emissions",
      value: "124.8 t",
      change: "-5.4%",
      trend: "up",
      description: "Lower emissions are better",
      iconName: "Cloud",
    },
    {
      id: 4,
      title: "Impact Points",
      value: "18,450",
      change: "+15.3%",
      trend: "up",
      description: "Earned by employees",
      iconName: "Award",
    },
  ];
  
  export const esgScores = {
    overall: 86.4,
    environmental: 91,
    social: 82,
    governance: 86,
  };
  
  export const departmentPerformance = [
    {
      id: 1,
      name: "Engineering",
      employees: 64,
      score: 92,
      status: "Excellent",
    },
    {
      id: 2,
      name: "Human Resources",
      employees: 28,
      score: 88,
      status: "Excellent",
    },
    {
      id: 3,
      name: "Marketing",
      employees: 35,
      score: 84,
      status: "Very Good",
    },
    {
      id: 4,
      name: "Finance",
      employees: 24,
      score: 81,
      status: "Very Good",
    },
    {
      id: 5,
      name: "Operations",
      employees: 42,
      score: 79,
      status: "Good",
    },
    {
      id: 6,
      name: "Sales",
      employees: 31,
      score: 76,
      status: "Good",
    },
  ];
  
  export const monthlyESGTrend = [
    { month: "Jan", environmental: 72, social: 68, governance: 74 },
    { month: "Feb", environmental: 74, social: 70, governance: 75 },
    { month: "Mar", environmental: 76, social: 72, governance: 77 },
    { month: "Apr", environmental: 78, social: 73, governance: 79 },
    { month: "May", environmental: 81, social: 76, governance: 80 },
    { month: "Jun", environmental: 83, social: 78, governance: 82 },
    { month: "Jul", environmental: 85, social: 79, governance: 83 },
    { month: "Aug", environmental: 88, social: 81, governance: 84 },
    { month: "Sep", environmental: 91, social: 82, governance: 86 },
  ];
  
  export const environmentalData = {
    carbonEmissions: 124.8,
    energySaved: 18450,
    waterSaved: 12400,
    wasteRecycled: 78,
    renewableEnergy: 64,
    carbonReduction: 18.5,
  };
  
  export const socialData = {
    employeeSatisfaction: 89,
    volunteerHours: 1240,
    diversityScore: 84,
    trainingHours: 860,
    communityProjects: 12,
  };
  
  export const governanceData = {
    complianceScore: 94,
    policiesImplemented: 28,
    pendingAudits: 3,
    riskLevel: "Low",
    completedAssessments: 42,
  };
  
  // ----------------------------------
  // MANAGER DASHBOARD DATA
  // ----------------------------------
  
  export const managerStats = [
    {
      id: 1,
      title: "Team Members",
      value: "32",
      change: "+2",
      trend: "up",
      description: "Active team members",
      iconName: "Users",
    },
    {
      id: 2,
      title: "Department ESG Score",
      value: "89.2",
      change: "+6.4%",
      trend: "up",
      description: "Above company average",
      iconName: "Leaf",
    },
    {
      id: 3,
      title: "Tasks Completed",
      value: "76",
      change: "+12%",
      trend: "up",
      description: "This month",
      iconName: "CheckCircle",
    },
    {
      id: 4,
      title: "Pending Tasks",
      value: "14",
      change: "-8%",
      trend: "up",
      description: "Compared to last month",
      iconName: "ClipboardList",
    },
  ];
  
  export const managerTasks = [
    {
      id: 1,
      title: "Complete monthly energy audit",
      category: "Environmental",
      assignee: "Rahul Sharma",
      dueDate: "2026-10-08",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Organize employee wellness session",
      category: "Social",
      assignee: "Priya Mehta",
      dueDate: "2026-10-10",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 3,
      title: "Review department compliance checklist",
      category: "Governance",
      assignee: "Amit Verma",
      dueDate: "2026-10-12",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Submit sustainability report",
      category: "Environmental",
      assignee: "Neha Singh",
      dueDate: "2026-10-15",
      priority: "Low",
      status: "Completed",
    },
    {
      id: 5,
      title: "Conduct team volunteering activity",
      category: "Social",
      assignee: "Karan Joshi",
      dueDate: "2026-10-18",
      priority: "Medium",
      status: "Pending",
    },
  ];
  
  export const managerTeam = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Software Engineer",
      initials: "RS",
      points: 1240,
      tasksCompleted: 18,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "UI/UX Designer",
      initials: "PM",
      points: 1180,
      tasksCompleted: 16,
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Verma",
      role: "Backend Developer",
      initials: "AV",
      points: 1050,
      tasksCompleted: 14,
      status: "Active",
    },
    {
      id: 4,
      name: "Neha Singh",
      role: "QA Engineer",
      initials: "NS",
      points: 980,
      tasksCompleted: 12,
      status: "Active",
    },
    {
      id: 5,
      name: "Karan Joshi",
      role: "Frontend Developer",
      initials: "KJ",
      points: 890,
      tasksCompleted: 11,
      status: "On Leave",
    },
  ];
  
  export const managerProgress = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 70 },
    { month: "Apr", score: 73 },
    { month: "May", score: 75 },
    { month: "Jun", score: 78 },
    { month: "Jul", score: 82 },
    { month: "Aug", score: 85 },
    { month: "Sep", score: 89 },
  ];
  
  // ----------------------------------
  // EMPLOYEE DASHBOARD DATA
  // ----------------------------------
  
  export const employeeProfile = {
    id: "EMP-1024",
    name: "Nandani Sankhla",
    firstName: "Nandani",
    role: "Frontend Developer",
    department: "Engineering",
    email: "nandani@ecospheretech.com",
    joinDate: "2025-08-01",
    avatar: "N",
    level: "Eco Champion",
    points: 2450,
    rank: 4,
    nextLevelPoints: 3000,
  };
  
  export const employeeStats = [
    {
      id: 1,
      title: "My Impact Points",
      value: "2,450",
      change: "+18%",
      trend: "up",
      description: "Keep earning rewards",
      iconName: "Award",
    },
    {
      id: 2,
      title: "Activities Completed",
      value: "28",
      change: "+6",
      trend: "up",
      description: "This month",
      iconName: "CheckCircle",
    },
    {
      id: 3,
      title: "Carbon Saved",
      value: "42.5 kg",
      change: "+12%",
      trend: "up",
      description: "Through personal actions",
      iconName: "Leaf",
    },
    {
      id: 4,
      title: "Current Rank",
      value: "#4",
      change: "+2",
      trend: "up",
      description: "In your department",
      iconName: "Trophy",
    },
  ];
  
  export const employeeActivities = [
    {
      id: 1,
      title: "Cycle to Work",
      category: "Environmental",
      date: "2026-10-03",
      points: 50,
      status: "Completed",
    },
    {
      id: 2,
      title: "Plastic-Free Lunch",
      category: "Environmental",
      date: "2026-10-02",
      points: 30,
      status: "Completed",
    },
    {
      id: 3,
      title: "Community Clean-up",
      category: "Social",
      date: "2026-10-01",
      points: 100,
      status: "Completed",
    },
    {
      id: 4,
      title: "Energy Saving Challenge",
      category: "Environmental",
      date: "2026-09-29",
      points: 75,
      status: "Completed",
    },
    {
      id: 5,
      title: "Workplace Ethics Training",
      category: "Governance",
      date: "2026-09-27",
      points: 60,
      status: "Completed",
    },
  ];
  
  export const employeeTasks = [
    {
      id: 1,
      title: "Complete sustainability awareness course",
      category: "Learning",
      dueDate: "2026-10-08",
      priority: "Medium",
      status: "Pending",
      points: 100,
    },
    {
      id: 2,
      title: "Submit weekly eco-action report",
      category: "Environmental",
      dueDate: "2026-10-10",
      priority: "High",
      status: "In Progress",
      points: 75,
    },
    {
      id: 3,
      title: "Join community volunteering event",
      category: "Social",
      dueDate: "2026-10-12",
      priority: "Low",
      status: "Pending",
      points: 150,
    },
  ];
  
  export const employeeAchievements = [
    {
      id: 1,
      title: "First Green Step",
      description: "Completed your first sustainability activity",
      icon: "🌱",
      unlocked: true,
    },
    {
      id: 2,
      title: "Eco Champion",
      description: "Earned 2,000 impact points",
      icon: "🏆",
      unlocked: true,
    },
    {
      id: 3,
      title: "Community Hero",
      description: "Completed 5 volunteering activities",
      icon: "🤝",
      unlocked: true,
    },
    {
      id: 4,
      title: "Planet Protector",
      description: "Earn 3,000 impact points",
      icon: "🌍",
      unlocked: false,
    },
  ];
  
  // ----------------------------------
  // SHARED DATA
  // ----------------------------------
  
  export const recentNotifications = [
    {
      id: 1,
      title: "Monthly ESG report is ready",
      message: "Your September report is available.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "New sustainability challenge",
      message: "Join the October Green Challenge.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Team milestone achieved",
      message: "Your department reached 90% task completion.",
      time: "Yesterday",
      read: true,
    },
  ];
  
  export const sustainabilityInitiatives = [
    {
      id: 1,
      title: "Zero Waste Workplace",
      category: "Environmental",
      progress: 78,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Employee Wellness Program",
      category: "Social",
      progress: 92,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Ethical Governance Review",
      category: "Governance",
      progress: 64,
      status: "In Progress",
    },
  ];
  
  export const leaderboard = [
    { rank: 1, name: "Rahul Sharma", department: "Engineering", points: 3240 },
    { rank: 2, name: "Priya Mehta", department: "Design", points: 2980 },
    { rank: 3, name: "Amit Verma", department: "Engineering", points: 2760 },
    { rank: 4, name: "Nandani Sankhla", department: "Engineering", points: 2450 },
    { rank: 5, name: "Neha Singh", department: "QA", points: 2210 },
  ];
  