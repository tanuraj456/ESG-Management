
import { useState } from "react";
import {
  Building2,
  Users,
  Leaf,
  Target,
  TrendingUp,
  Search,
  Download,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

const departmentInfo = {
  name: "Engineering",
  manager: "Nandani Sankhla",
  employees: 48,
  overallScore: 78,
  target: 90,
};

const departments = [
  {
    name: "Engineering",
    employees: 48,
    environmental: 78,
    social: 70,
    governance: 85,
    overall: 78,
  },
  {
    name: "Operations",
    employees: 32,
    environmental: 82,
    social: 76,
    governance: 80,
    overall: 79,
  },
  {
    name: "Human Resources",
    employees: 12,
    environmental: 75,
    social: 92,
    governance: 88,
    overall: 85,
  },
  {
    name: "Marketing",
    employees: 18,
    environmental: 72,
    social: 81,
    governance: 76,
    overall: 76,
  },
  {
    name: "Finance",
    employees: 14,
    environmental: 80,
    social: 74,
    governance: 91,
    overall: 82,
  },
];

const initiatives = [
  {
    title: "Paperless Workplace Initiative",
    category: "Environmental",
    progress: 85,
    status: "On Track",
    due: "Oct 15, 2026",
  },
  {
    title: "Employee Wellness Program",
    category: "Social",
    progress: 65,
    status: "In Progress",
    due: "Oct 20, 2026",
  },
  {
    title: "Annual Compliance Training",
    category: "Governance",
    progress: 40,
    status: "Needs Attention",
    due: "Oct 12, 2026",
  },
  {
    title: "Energy Conservation Drive",
    category: "Environmental",
    progress: 92,
    status: "On Track",
    due: "Oct 25, 2026",
  },
];

const teamMembers = [
  {
    name: "Rahul Sharma",
    role: "Senior Engineer",
    participation: 92,
    activities: 12,
    status: "Active",
  },
  {
    name: "Priya Mehta",
    role: "Software Engineer",
    participation: 88,
    activities: 10,
    status: "Active",
  },
  {
    name: "Amit Verma",
    role: "Team Lead",
    participation: 76,
    activities: 8,
    status: "Active",
  },
  {
    name: "Sneha Joshi",
    role: "Software Engineer",
    participation: 64,
    activities: 6,
    status: "Needs Follow-up",
  },
  {
    name: "Karan Singh",
    role: "Junior Engineer",
    participation: 52,
    activities: 4,
    status: "Needs Follow-up",
  },
];

function MyDepartment() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("initiatives");

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredInitiatives = initiatives.filter((initiative) =>
    initiative.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <style>{`
        .department-page {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .department-hero {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--border-color, #29443c);
          background: linear-gradient(120deg, #163832, #0b2b26);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .department-hero h2 {
          margin: 10px 0 6px;
          font-size: 24px;
          color: #daf1de;
        }

        .department-hero p {
          margin: 0;
          color: #a7c6b2;
          font-size: 13px;
        }

        .department-hero-icon {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: rgba(142, 182, 155, 0.16);
          color: #8eb69b;
        }

        .department-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .department-stat {
          padding: 20px;
          border: 1px solid var(--border-color, #29443c);
          background: var(--card-bg, #0b2b26);
          border-radius: 14px;
        }

        .department-stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .department-stat-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: var(--icon-bg, #163832);
          color: #8eb69b;
        }

        .department-stat h3 {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary, #94a3b8);
          margin: 16px 0 8px;
        }

        .department-stat strong {
          font-size: 28px;
        }

        .department-stat small {
          display: block;
          margin-top: 8px;
          color: var(--text-secondary, #94a3b8);
          font-size: 11px;
        }

        .department-panel {
          border: 1px solid var(--border-color, #29443c);
          background: var(--card-bg, #0b2b26);
          border-radius: 16px;
          padding: 22px;
          min-width: 0;
        }

        .department-panel h3 {
          margin: 0;
          font-size: 16px;
        }

        .department-panel-subtitle {
          color: var(--text-secondary, #94a3b8);
          font-size: 12px;
          margin: 6px 0 20px;
        }

        .department-table-wrap {
          overflow-x: auto;
        }

        .department-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 650px;
        }

        .department-table th {
          color: var(--text-secondary, #94a3b8);
          font-size: 11px;
          font-weight: 500;
          padding: 13px 12px;
          border-bottom: 1px solid var(--border-color, #29443c);
        }

        .department-table td {
          padding: 15px 12px;
          font-size: 13px;
          border-bottom: 1px solid var(--border-color, #29443c);
        }

        .department-table tr:last-child td {
          border-bottom: none;
        }

        .department-table tr.current-row {
          background: rgba(142, 182, 155, 0.07);
        }

        .department-score {
          display: inline-block;
          padding: 5px 9px;
          border-radius: 7px;
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
          font-weight: 600;
        }

        .department-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border-color, #29443c);
          margin-bottom: 18px;
        }

        .department-tab {
          padding: 11px 14px;
          border: none;
          border-bottom: 2px solid transparent;
          background: transparent;
          color: var(--text-secondary, #94a3b8);
          font-size: 13px;
          cursor: pointer;
        }

        .department-tab.active {
          color: #8eb69b;
          border-bottom-color: #8eb69b;
        }

        .department-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border: 1px solid var(--border-color, #29443c);
          border-radius: 9px;
          margin-bottom: 15px;
          max-width: 300px;
          color: var(--text-secondary, #94a3b8);
        }

        .department-search input {
          border: none;
          outline: none;
          background: transparent;
          color: var(--text-primary, #daf1de);
          width: 100%;
          font-size: 13px;
        }

        .department-progress {
          height: 7px;
          border-radius: 20px;
          background: var(--border-color, #29443c);
          overflow: hidden;
          margin-top: 8px;
        }

        .department-progress-fill {
          height: 100%;
          border-radius: inherit;
          background: #8eb69b;
        }

        .department-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border-radius: 20px;
          padding: 5px 9px;
          font-size: 11px;
          white-space: nowrap;
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }

        .department-status.warning {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
        }

        .department-status.info {
          background: rgba(96, 165, 250, 0.12);
          color: #60a5fa;
        }

        .department-action {
          border: 1px solid var(--border-color, #29443c);
          background: transparent;
          color: var(--text-primary, #daf1de);
          border-radius: 8px;
          padding: 8px 11px;
          font-size: 12px;
          cursor: pointer;
        }

        .department-action:hover {
          background: var(--icon-bg, #163832);
        }

        .department-bottom-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 18px;
        }

        .department-target {
          padding: 18px;
          border-radius: 12px;
          background: rgba(142, 182, 155, 0.08);
          margin-top: 18px;
        }

        .department-target-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 13px;
          margin-bottom: 12px;
        }

        @media (max-width: 900px) {
          .department-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .department-bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .department-stats {
            grid-template-columns: 1fr;
          }

          .department-panel {
            padding: 15px;
          }
        }
      `}</style>

      <div className="department-page">
        <div className="page-heading">
          <span className="eyebrow">MANAGER WORKSPACE</span>
          <h1>My Department</h1>
          <p>Monitor your department's progress, initiatives, and team engagement.</p>
        </div>

        <section className="department-hero">
          <div>
            <span className="eyebrow">DEPARTMENT PROFILE</span>
            <h2>{departmentInfo.name} Department</h2>
            <p>
              Managed by {departmentInfo.manager} · {departmentInfo.employees} team members
            </p>
          </div>
          <div className="department-hero-icon">
            <Building2 size={30} />
          </div>
        </section>

        <div className="department-stats">
          {[
            {
              title: "Team Members",
              value: departmentInfo.employees,
              note: "Active employees",
              icon: Users,
            },
            {
              title: "Overall ESG Score",
              value: `${departmentInfo.overallScore}/100`,
              note: "Current department score",
              icon: TrendingUp,
            },
            {
              title: "Active Initiatives",
              value: initiatives.length,
              note: "Across ESG categories",
              icon: Leaf,
            },
            {
              title: "Department Target",
              value: `${departmentInfo.target}/100`,
              note: "Annual ESG goal",
              icon: Target,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div className="department-stat" key={item.title}>
                <div className="department-stat-top">
                  <div className="department-stat-icon">
                    <Icon size={19} />
                  </div>
                  <ArrowUpRight size={16} color="#8eb69b" />
                </div>
                <h3>{item.title}</h3>
                <strong>{item.value}</strong>
                <small>{item.note}</small>
              </div>
            );
          })}
        </div>

        <section className="department-panel">
          <h3>Department Performance</h3>
          <p className="department-panel-subtitle">
            Compare ESG scores across departments. Your department is highlighted.
          </p>

          <div className="department-table-wrap">
            <table className="department-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Employees</th>
                  <th>Environmental</th>
                  <th>Social</th>
                  <th>Governance</th>
                  <th>Overall</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department) => (
                  <tr
                    key={department.name}
                    className={
                      department.name === departmentInfo.name
                        ? "current-row"
                        : ""
                    }
                  >
                    <td>
                      <strong>{department.name}</strong>
                      {department.name === departmentInfo.name && (
                        <span style={{ color: "#8eb69b", marginLeft: 8 }}>
                          (You)
                        </span>
                      )}
                    </td>
                    <td>{department.employees}</td>
                    <td>{department.environmental}</td>
                    <td>{department.social}</td>
                    <td>{department.governance}</td>
                    <td>
                      <span className="department-score">
                        {department.overall}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="department-bottom-grid">
          <section className="department-panel">
            <h3>Department Activities</h3>
            <p className="department-panel-subtitle">
              Track ongoing sustainability initiatives.
            </p>

            <div className="department-tabs">
              <button
                className={`department-tab ${activeTab === "initiatives" ? "active" : ""}`}
                onClick={() => setActiveTab("initiatives")}
              >
                Initiatives
              </button>
              <button
                className={`department-tab ${activeTab === "team" ? "active" : ""}`}
                onClick={() => setActiveTab("team")}
              >
                Team Members
              </button>
            </div>

            <div className="department-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  activeTab === "initiatives"
                    ? "Search initiatives..."
                    : "Search team members..."
                }
              />
            </div>

            {activeTab === "initiatives" ? (
              <div className="department-table-wrap">
                <table className="department-table">
                  <thead>
                    <tr>
                      <th>Initiative</th>
                      <th>Progress</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInitiatives.map((item) => (
                      <tr key={item.title}>
                        <td>
                          <strong>{item.title}</strong>
                          <div
                            style={{
                              color: "var(--text-secondary, #94a3b8)",
                              fontSize: 11,
                              marginTop: 5,
                            }}
                          >
                            {item.category} · Due {item.due}
                          </div>
                        </td>
                        <td>
                          {item.progress}%
                          <div className="department-progress">
                            <div
                              className="department-progress-fill"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </td>
                        <td>
                          <span
                            className={`department-status ${
                              item.status === "Needs Attention"
                                ? "warning"
                                : item.status === "In Progress"
                                  ? "info"
                                  : ""
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredInitiatives.length === 0 && (
                  <p>No initiatives found.</p>
                )}
              </div>
            ) : (
              <div className="department-table-wrap">
                <table className="department-table">
                  <thead>
                    <tr>
                      <th>Team Member</th>
                      <th>Participation</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.name}>
                        <td>
                          <strong>{member.name}</strong>
                          <div
                            style={{
                              color: "var(--text-secondary, #94a3b8)",
                              fontSize: 11,
                              marginTop: 5,
                            }}
                          >
                            {member.role} · {member.activities} activities
                          </div>
                        </td>
                        <td>{member.participation}%</td>
                        <td>
                          <span
                            className={`department-status ${
                              member.status !== "Active" ? "warning" : ""
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredMembers.length === 0 && (
                  <p>No team members found.</p>
                )}
              </div>
            )}
          </section>

          <section className="department-panel">
            <h3>Progress Toward Annual Target</h3>
            <p className="department-panel-subtitle">
              Your department's progress toward its ESG goal.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 28,
              }}
            >
              <strong style={{ fontSize: 34 }}>
                {departmentInfo.overallScore}
              </strong>
              <span style={{ color: "var(--text-secondary, #94a3b8)" }}>
                Target: {departmentInfo.target}
              </span>
            </div>

            <div className="department-progress" style={{ height: 12 }}>
              <div
                className="department-progress-fill"
                style={{
                  width: `${(departmentInfo.overallScore / departmentInfo.target) * 100}%`,
                }}
              />
            </div>

            <p
              style={{
                color: "var(--text-secondary, #94a3b8)",
                fontSize: 12,
                marginTop: 12,
              }}
            >
              {Math.round(
                (departmentInfo.overallScore / departmentInfo.target) * 100
              )}
              % of the annual target achieved.
            </p>

            <div className="department-target">
              <div className="department-target-head">
                <strong>Next milestone</strong>
                <span style={{ color: "#8eb69b" }}>85 points</span>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-secondary, #94a3b8)",
                  margin: 0,
                }}
              >
                Improve employee participation and complete pending compliance
                training to reach the next milestone.
              </p>
            </div>

            <button
              className="department-action"
              style={{ marginTop: 20, width: "100%" }}
              onClick={() =>
                alert("Department report export will be available soon.")
              }
            >
              <Download
                size={14}
                style={{ verticalAlign: "middle", marginRight: 6 }}
              />
              Export Department Report
            </button>
          </section>
        </div>

        <section
          className="department-panel"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <CheckCircle2 color="#8eb69b" size={22} />
          <div>
            <strong>Department workspace</strong>
            <p
              style={{
                color: "var(--text-secondary, #94a3b8)",
                fontSize: 12,
                margin: "5px 0 0",
              }}
            >
              All figures shown are sample data for frontend demonstration.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyDepartment;
