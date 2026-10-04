
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==================== PUBLIC PAGES ====================
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

// ==================== LAYOUTS ====================
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import SuperAdminLayout from "./components/super-admin/SuperAdminLayout.jsx";

// ==================== ADMIN PAGES ====================
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Departments from "./pages/admin/Departments.jsx";
import Employees from "./pages/admin/Employees.jsx";
import EnvironmentalImpact from "./pages/admin/EnvironmentalImpact.jsx";
import ESGPerformance from "./pages/admin/ESGPerformance.jsx";
import Gamification from "./pages/admin/Gamification.jsx";
import Governance from "./pages/admin/Governance.jsx";
import AdminReports from "./pages/admin/Reports.jsx";
import AdminSettings from "./pages/admin/Settings.jsx";
import SocialImpact from "./pages/admin/SocialImpact.jsx";

// ==================== MANAGER PAGES ====================
import ManagerDashboard from "./pages/manager/ManagerDashboard.jsx";
import MyDepartment from "./pages/manager/MyDepartment.jsx";
import ESGInitiatives from "./pages/manager/ESGInitiatives.jsx";
import ManagerCompliance from "./pages/manager/Compliance.jsx";
import CSRActivities from "./pages/manager/CSRActivities.jsx";
import ManagerReports from "./pages/manager/Reports.jsx";
import ManagerSettings from "./pages/manager/ManagerSettings.jsx";
import Targets from "./pages/manager/Targets.jsx";
import Tasks from "./pages/manager/Tasks.jsx";
import TeamMembers from "./pages/manager/TeamMembers.jsx";

// ==================== EMPLOYEE PAGES ====================
import EmployeeDashboard from "./pages/employee/EmployeeDashboard.jsx";
import EmployeeSettings from "./pages/employee/EmployeeSettings.jsx";
import Achievements from "./pages/employee/Achievements.jsx";
import MyActivities from "./pages/employee/MyActivities.jsx";
import MyImpact from "./pages/employee/MyImpact.jsx";
import MyTasks from "./pages/employee/MyTasks.jsx";
import Resources from "./pages/employee/Resources.jsx";

// ==================== SUPER ADMIN PAGES ====================
import SuperAdminOverview from "./pages/manager/super-admin/SuperAdminOverview.jsx";
import CompaniesPage from "./pages/manager/super-admin/CompaniesPage.jsx";
import PlatformAnalytics from "./pages/manager/super-admin/PlatformAnalytics.jsx";
import PlatformSettings from "./pages/manager/super-admin/PlatformSettings.jsx";
import AuditLogsPage from "./pages/manager/super-admin/AuditLogsPage.jsx";
import SupportPage from "./pages/manager/super-admin/SupportPage.jsx";
import UserDirectoryPage from "./pages/manager/super-admin/UserDirectoryPage.jsx";

// ==================== 404 PAGE ====================
function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

// ==================== APP ROUTING ====================
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="employees" element={<Employees />} />
          <Route
            path="environmental-impact"
            element={<EnvironmentalImpact />}
          />
          <Route path="esg-performance" element={<ESGPerformance />} />
          <Route path="gamification" element={<Gamification />} />
          <Route path="governance" element={<Governance />} />
          <Route path="social-impact" element={<SocialImpact />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* MANAGER ROUTES */}
        <Route path="/manager" element={<DashboardLayout />}>
          <Route index element={<ManagerDashboard />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="department" element={<MyDepartment />} />
          <Route path="initiatives" element={<ESGInitiatives />} />
          <Route path="compliance" element={<ManagerCompliance />} />
          <Route path="csr-activities" element={<CSRActivities />} />
          <Route path="reports" element={<ManagerReports />} />
          <Route path="settings" element={<ManagerSettings />} />
          <Route path="targets" element={<Targets />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="team" element={<TeamMembers />} />
        </Route>

        {/* EMPLOYEE ROUTES */}
        <Route path="/employee" element={<DashboardLayout />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
          <Route path="activities" element={<MyActivities />} />
          <Route path="impact" element={<MyImpact />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<EmployeeSettings />} />
        </Route>

        {/* SUPER ADMIN ROUTES */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminOverview />} />
          <Route path="overview" element={<SuperAdminOverview />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="analytics" element={<PlatformAnalytics />} />
          <Route path="settings" element={<PlatformSettings />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="users" element={<UserDirectoryPage />} />
        </Route>

        {/* FALLBACK ROUTE */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
