import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EnvironmentalImpact from "./pages/admin/EnvironmentalImpact";
import SocialImpact from "./pages/admin/SocialImpact";
import Governance from "./pages/admin/Governance";
import Departments from "./pages/admin/Departments";
import Gamification from "./pages/admin/Gamification";
import Employees from "./pages/admin/Employees";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import "./App.css";

// ESG Performance Dashboard
function ESGPerformance() {
  const scores = [
    { title: "Environmental", score: 82, color: "#16a34a", description: "Strong environmental performance", icon: "🌱" },
    { title: "Social", score: 74, color: "#2563eb", description: "Room for improvement", icon: "🤝" },
    { title: "Governance", score: 88, color: "#9333ea", description: "Excellent compliance standards", icon: "🛡️" },
    { title: "Overall ESG", score: 81, color: "#0d9488", description: "Average of ESG categories", icon: "📈" },
  ];

  return (
    <div className="dashboard-page esg-performance-page">
      <div className="page-heading">
        <span className="eyebrow">ESG ANALYTICS</span>
        <h1>ESG Performance</h1>
        <p>Track your organization's environmental, social, and governance performance using live demo metrics.</p>
      </div>

      {/* ESG Score Cards */}
      <div className="esg-score-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "28px" }}>
        {scores.map((item) => (
          <div key={item.title} className="dashboard-card" style={{ padding: "24px", borderTop: `4px solid ${item.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <span style={{ color: "var(--text-secondary, #94a3b8)" }}>{item.title} Score</span>
              <span style={{ fontSize: "22px" }}>{item.icon}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "14px" }}>
              <strong style={{ fontSize: "36px", color: item.color }}>{item.score}</strong>
              <span style={{ color: "var(--text-secondary, #94a3b8)" }}>/ 100</span>
            </div>
            <div style={{ height: "8px", background: "var(--border-color, #294238)", borderRadius: "20px", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ height: "100%", width: `${item.score}%`, background: item.color, borderRadius: "20px", transition: "width 0.3s ease" }} />
            </div>
            <p style={{ color: "var(--text-secondary, #94a3b8)", fontSize: "13px", margin: 0 }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Coming Soon Page
function ComingSoon({ title }) {
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">ECOSPHERE WORKSPACE</span>
        <h1>{title}</h1>
        <p>This module is being prepared. Demo functionality will be available here soon.</p>
      </div>
      <div className="dashboard-card" style={{ padding: "32px" }}>
        <h3>{title}</h3>
        <p>This section will contain interactive ESG data, reports, and management tools.</p>
        <span className="status-badge">Coming Soon</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Admin Routes */}
        <Route element={<DashboardLayout role="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/esg" element={<ESGPerformance />} />
          <Route path="/admin/environmental" element={<EnvironmentalImpact />} />
          <Route path="/admin/social" element={<SocialImpact />} />
          <Route path="/admin/governance" element={<Governance />} />
          <Route path="/admin/departments" element={<Departments />} />
          <Route path="/admin/gamification" element={<Gamification />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>

        {/* Manager Routes */}
        <Route element={<DashboardLayout role="manager" />}>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/*" element={<ComingSoon title="Manager Workspace" />} />
        </Route>

        {/* Employee Routes */}
        <Route element={<DashboardLayout role="employee" />}>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/*" element={<ComingSoon title="Employee Workspace" />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;