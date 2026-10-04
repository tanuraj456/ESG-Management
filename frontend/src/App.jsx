<<<<<<< Updated upstream
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
=======
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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

// ESG Performance Dashboard
function ESGPerformance() {
  const scores = [
    {
      title: "Environmental",
      score: 82,
      color: "#16a34a",
      description: "Strong environmental performance",
      icon: "🌱",
    },
    {
      title: "Social",
      score: 74,
      color: "#2563eb",
      description: "Room for improvement",
      icon: "🤝",
    },
    {
      title: "Governance",
      score: 88,
      color: "#9333ea",
      description: "Excellent compliance standards",
      icon: "🛡️",
    },
    {
      title: "Overall ESG",
      score: 81,
      color: "#0d9488",
      description: "Average of ESG categories",
      icon: "📈",
    },
  ];

  const monthlyTrend = [
    { month: "Nov", score: 62 },
    { month: "Dec", score: 68 },
    { month: "Jan", score: 75 },
    { month: "Feb", score: 79 },
    { month: "Mar", score: 77 },
    { month: "Apr", score: 72 },
    { month: "May", score: 65 },
    { month: "Jun", score: 67 },
    { month: "Jul", score: 71 },
    { month: "Aug", score: 76 },
    { month: "Sep", score: 80 },
    { month: "Oct", score: 81 },
  ];

  const departments = [
    { name: "Corporate", score: 96, employees: 24 },
    { name: "Engineering", score: 92, employees: 48 },
    { name: "Human Resources", score: 86, employees: 12 },
    { name: "Operations", score: 81, employees: 32 },
    { name: "Marketing", score: 76, employees: 18 },
    { name: "Finance", score: 73, employees: 14 },
  ];

  const activities = [
    {
      title: "Zero Waste Week completed",
      department: "Operations",
      date: "Today, 10:30 AM",
      status: "Completed",
    },
    {
      title: "New compliance issue reported",
      department: "Logistics",
      date: "Today, 9:15 AM",
      status: "Attention",
    },
    {
      title: "42 carbon transactions logged",
      department: "Engineering",
      date: "Yesterday",
      status: "Completed",
    },
    {
      title: "Anti-Corruption Policy acknowledged",
      department: "R&D",
      date: "Yesterday",
      status: "Completed",
    },
  ];

  return (
    <div className="dashboard-page esg-performance-page">
      <div className="page-heading">
        <span className="eyebrow">ESG ANALYTICS</span>
        <h1>ESG Performance</h1>
        <p>
          Track your organization's environmental, social, and governance
          performance using live demo metrics.
        </p>
      </div>

      {/* ESG Score Cards */}
      <div
        className="esg-score-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        {scores.map((item) => (
          <div
            key={item.title}
            className="dashboard-card"
            style={{
              padding: "24px",
              borderTop: `4px solid ${item.color}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <span style={{ color: "var(--text-secondary, #94a3b8)" }}>
                {item.title} Score
              </span>
              <span style={{ fontSize: "22px" }}>{item.icon}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                marginBottom: "14px",
              }}
            >
              <strong style={{ fontSize: "36px", color: item.color }}>
                {item.score}
              </strong>
              <span style={{ color: "var(--text-secondary, #94a3b8)" }}>
                / 100
              </span>
            </div>

            <div
              style={{
                height: "8px",
                background: "var(--border-color, #294238)",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${item.score}%`,
                  background: item.color,
                  borderRadius: "20px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            <p
              style={{
                color: "var(--text-secondary, #94a3b8)",
                fontSize: "13px",
                margin: 0,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        {/* Monthly Trend */}
        <div className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
            Monthly ESG Trend
          </h3>

          <p
            style={{
              color: "var(--text-secondary, #94a3b8)",
              fontSize: "13px",
              marginBottom: "24px",
            }}
          >
            Overall ESG score over the last 12 months
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              gap: "8px",
              height: "210px",
              paddingTop: "20px",
              borderBottom: "1px solid var(--border-color, #294238)",
            }}
          >
            {monthlyTrend.map((item) => (
              <div
                key={item.month}
                title={`${item.month}: ${item.score}/100`}
                style={{
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: "34px",
                    height: `${item.score}%`,
                    background: "linear-gradient(180deg, #22c55e, #15803d)",
                    borderRadius: "6px 6px 0 0",
                    transition: "height 0.3s ease",
                  }}
                />

                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary, #94a3b8)",
                    marginBottom: "-24px",
                  }}
                >
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Ranking */}
        <div className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
            Department ESG Ranking
          </h3>

          <p
            style={{
              color: "var(--text-secondary, #94a3b8)",
              fontSize: "13px",
              marginBottom: "24px",
            }}
          >
            Compare sustainability performance across departments
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {departments
              .slice()
              .sort((a, b) => b.score - a.score)
              .map((department, index) => (
                <div key={department.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>
                      {index + 1}. {department.name}
                    </span>
                    <strong>{department.score}/100</strong>
                  </div>

                  <div
                    style={{
                      height: "9px",
                      background: "var(--border-color, #294238)",
                      borderRadius: "20px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${department.score}%`,
                        background:
                          department.score >= 85
                            ? "#16a34a"
                            : department.score >= 75
                              ? "#3b82f6"
                              : "#eab308",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Department Table */}
      <div
        className="dashboard-card"
        style={{ padding: "24px", marginBottom: "28px" }}
      >
        <h3 style={{ marginTop: 0 }}>Department Performance Details</h3>

        <p
          style={{
            color: "var(--text-secondary, #94a3b8)",
            fontSize: "13px",
            marginBottom: "20px",
          }}
        >
          Detailed breakdown of ESG scores by department
        </p>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color, #294238)" }}>
                <th style={{ padding: "14px 10px" }}>Department</th>
                <th style={{ padding: "14px 10px" }}>Employees</th>
                <th style={{ padding: "14px 10px" }}>ESG Score</th>
                <th style={{ padding: "14px 10px" }}>Performance</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((department) => (
                <tr
                  key={department.name}
                  style={{
                    borderBottom: "1px solid var(--border-color, #294238)",
                  }}
                >
                  <td style={{ padding: "16px 10px" }}>
                    {department.name}
                  </td>

                  <td style={{ padding: "16px 10px" }}>
                    {department.employees}
                  </td>

                  <td style={{ padding: "16px 10px", fontWeight: 600 }}>
                    {department.score}/100
                  </td>

                  <td style={{ padding: "16px 10px" }}>
                    <span
                      className="status-badge"
                      style={{
                        color:
                          department.score >= 85
                            ? "#16a34a"
                            : department.score >= 75
                              ? "#2563eb"
                              : "#d97706",
                      }}
                    >
                      {department.score >= 85
                        ? "Excellent"
                        : department.score >= 75
                          ? "Good"
                          : "Needs Improvement"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent ESG Activity */}
      <div className="dashboard-card" style={{ padding: "24px" }}>
        <h3 style={{ marginTop: 0 }}>Recent ESG Activity</h3>

        <p
          style={{
            color: "var(--text-secondary, #94a3b8)",
            fontSize: "13px",
            marginBottom: "20px",
          }}
        >
          Latest sustainability updates across your organization
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {activities.map((activity, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
                padding: "16px 0",
                borderBottom:
                  index !== activities.length - 1
                    ? "1px solid var(--border-color, #294238)"
                    : "none",
              }}
            >
              <div>
                <strong style={{ display: "block", marginBottom: "6px" }}>
                  {activity.title}
                </strong>

                <span
                  style={{
                    color: "var(--text-secondary, #94a3b8)",
                    fontSize: "13px",
                  }}
                >
                  {activity.department} · {activity.date}
                </span>
              </div>

              <span
                className="status-badge"
                style={{
                  color:
                    activity.status === "Attention"
                      ? "#d97706"
                      : "#16a34a",
                }}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
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
        <p>
          This module is being prepared. Demo functionality will be available
          here soon.
        </p>
      </div>

      <div className="dashboard-card" style={{ padding: "32px" }}>
        <h3>{title}</h3>
        <p>
          This section will contain interactive ESG data, reports, and
          management tools.
        </p>
        <span className="status-badge">Coming Soon</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin Routes */}
        <Route element={<DashboardLayout role="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/admin/esg" element={<ESGPerformance />} />

          <Route
            path="/admin/environmental"
            element={<EnvironmentalImpact />}
          />

          <Route
          path="/admin/social"
          element={<SocialImpact />}
          />

          <Route
          path="/admin/governance"
          element={<Governance />}
          />

         <Route
          path="/admin/departments"
          element={<Departments />}
          />

         <Route
         path="/admin/gamification"
         element={<Gamification />}
         />

         <Route path="/admin/employees" element={<Employees />} />

         <Route path="/admin/reports" element={<Reports />} />

         <Route path="/admin/settings" element={<Settings />} />
         
         </Route>

        {/* Manager Routes */}
        <Route element={<DashboardLayout role="manager" />}>
          <Route path="/manager" element={<ManagerDashboard />} />

          <Route
            path="/manager/*"
            element={<ComingSoon title="Manager Workspace" />}
          />
        </Route>

        {/* Employee Routes */}
        <Route element={<DashboardLayout role="employee" />}>
          <Route path="/employee" element={<EmployeeDashboard />} />

          <Route
            path="/employee/*"
            element={<ComingSoon title="Employee Workspace" />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> Stashed changes
