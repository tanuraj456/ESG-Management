
import { useMemo, useState } from "react";

/* =========================================
   DEMO DATA
========================================= */

const complianceData = [
  { name: "Environmental Regulations", score: 96 },
  { name: "Data Privacy & Protection", score: 92 },
  { name: "Workplace Safety", score: 94 },
  { name: "Corporate Governance", score: 88 },
  { name: "Ethical Business Practices", score: 97 },
];

const esgPolicies = [
  {
    id: "ESG-001",
    name: "Environmental Sustainability Policy",
    category: "Environmental",
    owner: "Sustainability Team",
    updated: "Oct 12, 2026",
    version: "2.1",
    status: "Active",
  },
  {
    id: "ESG-002",
    name: "Workplace Diversity & Inclusion",
    category: "Social",
    owner: "Human Resources",
    updated: "Oct 08, 2026",
    version: "1.4",
    status: "Active",
  },
  {
    id: "ESG-003",
    name: "Business Ethics & Conduct",
    category: "Governance",
    owner: "Compliance Team",
    updated: "Oct 05, 2026",
    version: "3.0",
    status: "Under Review",
  },
  {
    id: "ESG-004",
    name: "Waste Management Policy",
    category: "Environmental",
    owner: "Operations",
    updated: "Sep 28, 2026",
    version: "1.2",
    status: "Active",
  },
  {
    id: "ESG-005",
    name: "Employee Health & Safety",
    category: "Social",
    owner: "HR Department",
    updated: "Sep 21, 2026",
    version: "2.0",
    status: "Draft",
  },
];

const initialAcknowledgements = [
  {
    id: 1,
    employee: "Aarav Sharma",
    department: "Engineering",
    policy: "Environmental Sustainability Policy",
    date: "Oct 20, 2026",
    status: "Acknowledged",
  },
  {
    id: 2,
    employee: "Priya Mehta",
    department: "Human Resources",
    policy: "Workplace Diversity & Inclusion",
    date: "Oct 19, 2026",
    status: "Acknowledged",
  },
  {
    id: 3,
    employee: "Rohan Verma",
    department: "Operations",
    policy: "Business Ethics & Conduct",
    date: "Pending",
    status: "Pending",
  },
  {
    id: 4,
    employee: "Ananya Singh",
    department: "Finance",
    policy: "Environmental Sustainability Policy",
    date: "Pending",
    status: "Pending",
  },
  {
    id: 5,
    employee: "Kabir Joshi",
    department: "Procurement",
    policy: "Waste Management Policy",
    date: "Oct 17, 2026",
    status: "Acknowledged",
  },
];

const audits = [
  {
    id: "AUD-026",
    name: "Q3 Environmental Compliance Audit",
    department: "Operations",
    date: "Oct 20, 2026",
    findings: 2,
    status: "Completed",
  },
  {
    id: "AUD-027",
    name: "Data Privacy Assessment",
    department: "Information Technology",
    date: "Oct 24, 2026",
    findings: 1,
    status: "In Progress",
  },
  {
    id: "AUD-028",
    name: "Workplace Safety Review",
    department: "Human Resources",
    date: "Oct 28, 2026",
    findings: 0,
    status: "Scheduled",
  },
  {
    id: "AUD-029",
    name: "Supplier Sustainability Audit",
    department: "Procurement",
    date: "Nov 02, 2026",
    findings: 0,
    status: "Scheduled",
  },
];

const complianceIssues = [
  {
    id: "CMP-101",
    title: "Incomplete supplier ESG documentation",
    category: "Supply Chain",
    severity: "High",
    department: "Procurement",
    reported: "Oct 18, 2026",
    status: "Open",
  },
  {
    id: "CMP-102",
    title: "Pending employee policy acknowledgements",
    category: "Policy",
    severity: "Medium",
    department: "Human Resources",
    reported: "Oct 16, 2026",
    status: "In Progress",
  },
  {
    id: "CMP-103",
    title: "Missing energy consumption records",
    category: "Environmental",
    severity: "High",
    department: "Operations",
    reported: "Oct 14, 2026",
    status: "Open",
  },
  {
    id: "CMP-104",
    title: "Safety training documentation update",
    category: "Workplace Safety",
    severity: "Low",
    department: "Human Resources",
    reported: "Oct 10, 2026",
    status: "Resolved",
  },
];

const riskData = [
  {
    title: "Data Privacy",
    category: "Operational",
    level: "High",
    description:
      "Review access controls and data protection procedures.",
    owner: "IT Department",
  },
  {
    title: "Regulatory Updates",
    category: "Compliance",
    level: "Medium",
    description:
      "Monitor upcoming changes in environmental regulations.",
    owner: "Compliance Team",
  },
  {
    title: "Supplier Compliance",
    category: "Supply Chain",
    level: "Medium",
    description:
      "Complete pending supplier sustainability assessments.",
    owner: "Procurement",
  },
  {
    title: "Workplace Safety",
    category: "Operational",
    level: "Low",
    description:
      "Continue routine safety inspections and training.",
    owner: "HR Department",
  },
];

const initialActions = [
  {
    title: "Complete data privacy review",
    department: "IT Department",
    due: "Oct 25, 2026",
    priority: "High",
    completed: false,
  },
  {
    title: "Update supplier compliance records",
    department: "Procurement",
    due: "Oct 27, 2026",
    priority: "Medium",
    completed: false,
  },
  {
    title: "Approve revised governance policy",
    department: "Compliance Team",
    due: "Oct 30, 2026",
    priority: "Medium",
    completed: false,
  },
  {
    title: "Submit quarterly audit report",
    department: "Operations",
    due: "Oct 18, 2026",
    priority: "Low",
    completed: true,
  },
];

/* =========================================
   REUSABLE COMPONENTS
========================================= */

function SectionHeader({ title, description, badge }) {
  return (
    <div className="governance-panel-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {badge && (
        <span className="governance-panel-badge">{badge}</span>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const className = status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span className={`governance-status-badge ${className}`}>
      {status}
    </span>
  );
}

/* =========================================
   MAIN DASHBOARD
========================================= */

function Governance() {
  const [period, setPeriod] = useState("This Quarter");
  const [policySearch, setPolicySearch] = useState("");
  const [ackFilter, setAckFilter] = useState("All");
  const [issueFilter, setIssueFilter] = useState("All");
  const [acknowledgements, setAcknowledgements] =
    useState(initialAcknowledgements);
  const [actions, setActions] = useState(initialActions);

  const filteredPolicies = useMemo(() => {
    const query = policySearch.toLowerCase();

    return esgPolicies.filter(
      (policy) =>
        policy.name.toLowerCase().includes(query) ||
        policy.id.toLowerCase().includes(query) ||
        policy.category.toLowerCase().includes(query)
    );
  }, [policySearch]);

  const filteredAcknowledgements = acknowledgements.filter(
    (item) =>
      ackFilter === "All" || item.status === ackFilter
  );

  const filteredIssues = complianceIssues.filter(
    (item) =>
      issueFilter === "All" || item.status === issueFilter
  );

  const acknowledgedCount = acknowledgements.filter(
    (item) => item.status === "Acknowledged"
  ).length;

  const pendingCount =
    acknowledgements.length - acknowledgedCount;

  const completedActions = actions.filter(
    (item) => item.completed
  ).length;

  const toggleAction = (index) => {
    setActions((current) =>
      current.map((item, i) =>
        i === index
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const markAcknowledged = (id) => {
    setAcknowledgements((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Acknowledged",
              date: "Oct 22, 2026",
            }
          : item
      )
    );
  };

  const exportReport = () => {
    const rows = [
      ["Governance Report"],
      [],
      ["Compliance Overview"],
      ["Area", "Score"],
      ...complianceData.map((item) => [
        item.name,
        `${item.score}%`,
      ]),
      [],
      ["ESG Policies"],
      ["Policy ID", "Name", "Category", "Owner", "Status"],
      ...esgPolicies.map((item) => [
        item.id,
        item.name,
        item.category,
        item.owner,
        item.status,
      ]),
      [],
      ["Policy Acknowledgements"],
      ["Employee", "Department", "Policy", "Status"],
      ...acknowledgements.map((item) => [
        item.employee,
        item.department,
        item.policy,
        item.status,
      ]),
      [],
      ["Compliance Issues"],
      ["Issue ID", "Title", "Severity", "Department", "Status"],
      ...complianceIssues.map((item) => [
        item.id,
        item.title,
        item.severity,
        item.department,
        item.status,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecospher-governance-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="governance-page">
      {/* HEADER */}

      <div className="governance-header">
        <div>
          <div className="governance-breadcrumb">
            Admin <span>/</span> Governance
          </div>

          <h1>Governance & Compliance</h1>

          <p>
            Manage ESG policies, employee acknowledgements,
            audits, and compliance issues.
          </p>
        </div>

        <div className="governance-header-actions">
          <select
            className="governance-period-selector"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            aria-label="Select reporting period"
          >
            <option>This Quarter</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>

          <button
            className="governance-export-btn"
            onClick={exportReport}
          >
            ↓ Export Report
          </button>
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="governance-kpi-grid">
        <div className="governance-kpi-card">
          <div className="governance-kpi-top">
            <span className="governance-kpi-icon compliance">
              ✓
            </span>
            <span className="governance-kpi-trend">
              ↗ 4.2%
            </span>
          </div>
          <p>Overall Compliance</p>
          <h2>93.4<span>%</span></h2>
          <small>Across all compliance areas</small>
        </div>

        <div className="governance-kpi-card">
          <div className="governance-kpi-top">
            <span className="governance-kpi-icon policies">
              ▤
            </span>
            <span className="governance-kpi-trend">
              ↗ 2 new
            </span>
          </div>
          <p>Active ESG Policies</p>
          <h2>28</h2>
          <small>Policies currently maintained</small>
        </div>

        <div className="governance-kpi-card">
          <div className="governance-kpi-top">
            <span className="governance-kpi-icon audits">
              ▣
            </span>
            <span className="governance-kpi-trend">
              ↗ 8.5%
            </span>
          </div>
          <p>Audit Completion</p>
          <h2>86<span>%</span></h2>
          <small>Quarterly audit progress</small>
        </div>

        <div className="governance-kpi-card">
          <div className="governance-kpi-top">
            <span className="governance-kpi-icon risks">
              ⚠
            </span>
            <span className="governance-risk-label">
              Needs attention
            </span>
          </div>
          <p>Open Compliance Issues</p>
          <h2>12</h2>
          <small>3 high-priority issues</small>
        </div>
      </div>

      {/* COMPLIANCE OVERVIEW */}

      <section className="governance-panel">
        <SectionHeader
          title="Compliance Overview"
          description="Performance across key regulatory and internal standards"
          badge="Current status"
        />

        <div className="governance-compliance-list">
          {complianceData.map((item) => (
            <div
              className="governance-compliance-row"
              key={item.name}
            >
              <div className="governance-compliance-info">
                <strong>{item.name}</strong>
                <span
                  className={`governance-status-badge ${
                    item.score >= 90 ? "compliant" : "review"
                  }`}
                >
                  {item.score >= 90
                    ? "Compliant"
                    : "Review Required"}
                </span>
              </div>

              <div className="governance-compliance-progress">
                <div className="governance-progress-track">
                  <div
                    className="governance-progress-fill"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <strong>{item.score}%</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1. ESG POLICIES */}

      <section className="governance-panel">
        <SectionHeader
          title="ESG Policies"
          description="Manage environmental, social, and governance policies"
          badge={`${esgPolicies.length} policies`}
        />

        <div className="governance-toolbar">
          <div className="governance-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search ESG policies..."
              value={policySearch}
              onChange={(e) => setPolicySearch(e.target.value)}
            />
          </div>

          <span className="governance-toolbar-note">
            Showing {filteredPolicies.length} policies
          </span>
        </div>

        <div className="governance-table-wrapper">
          <table className="governance-table">
            <thead>
              <tr>
                <th>Policy Name</th>
                <th>Policy ID</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Version</th>
                <th>Last Updated</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredPolicies.map((policy) => (
                <tr key={policy.id}>
                  <td className="governance-policy-name">
                    {policy.name}
                  </td>
                  <td>{policy.id}</td>
                  <td>{policy.category}</td>
                  <td>{policy.owner}</td>
                  <td>{policy.version}</td>
                  <td>{policy.updated}</td>
                  <td>
                    <StatusBadge status={policy.status} />
                  </td>
                </tr>
              ))}

              {filteredPolicies.length === 0 && (
                <tr>
                  <td colSpan="7" className="governance-empty">
                    No matching policies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. POLICY ACKNOWLEDGEMENTS */}

      <section className="governance-panel">
        <SectionHeader
          title="Policy Acknowledgements"
          description="Track employee acceptance of mandatory ESG policies"
          badge={`${pendingCount} pending`}
        />

        <div className="governance-ack-summary">
          <div className="governance-ack-stat">
            <span className="governance-ack-icon acknowledged">
              ✓
            </span>
            <div>
              <strong>{acknowledgedCount}</strong>
              <span>Acknowledged</span>
            </div>
          </div>

          <div className="governance-ack-stat">
            <span className="governance-ack-icon pending">
              ◷
            </span>
            <div>
              <strong>{pendingCount}</strong>
              <span>Pending</span>
            </div>
          </div>

          <div className="governance-ack-stat">
            <span className="governance-ack-icon total">
              ▤
            </span>
            <div>
              <strong>{acknowledgements.length}</strong>
              <span>Total Records</span>
            </div>
          </div>
        </div>

        <div className="governance-toolbar">
          <span className="governance-toolbar-note">
            Employee acknowledgement records
          </span>

          <select
            className="governance-filter"
            value={ackFilter}
            onChange={(e) => setAckFilter(e.target.value)}
            aria-label="Filter acknowledgements"
          >
            <option>All</option>
            <option>Acknowledged</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="governance-table-wrapper">
          <table className="governance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>ESG Policy</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAcknowledgements.map((item) => (
                <tr key={item.id}>
                  <td className="governance-policy-name">
                    {item.employee}
                  </td>
                  <td>{item.department}</td>
                  <td>{item.policy}</td>
                  <td>{item.date}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    {item.status === "Pending" ? (
                      <button
                        className="governance-ack-btn"
                        onClick={() => markAcknowledged(item.id)}
                      >
                        Mark acknowledged
                      </button>
                    ) : (
                      <span className="governance-done-label">
                        ✓ Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredAcknowledgements.length === 0 && (
                <tr>
                  <td colSpan="6" className="governance-empty">
                    No acknowledgement records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. AUDITS */}

      <section className="governance-panel">
        <SectionHeader
          title="Audits"
          description="Monitor audit schedules, findings, and completion status"
          badge={`${audits.length} audits`}
        />

        <div className="governance-audit-list">
          {audits.map((audit) => (
            <div className="governance-audit-row" key={audit.id}>
              <div className="governance-audit-icon">
                ▣
              </div>

              <div className="governance-audit-content">
                <strong>{audit.name}</strong>
                <span>
                  {audit.id} · {audit.department}
                </span>
              </div>

              <div className="governance-audit-findings">
                <strong>{audit.findings}</strong>
                <span>Findings</span>
              </div>

              <div className="governance-audit-date">
                {audit.date}
              </div>

              <StatusBadge status={audit.status} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. COMPLIANCE ISSUES */}

      <section className="governance-panel">
        <SectionHeader
          title="Compliance Issues"
          description="Identify, prioritize, and track compliance gaps"
          badge={`${complianceIssues.filter((item) => item.status !== "Resolved").length} unresolved`}
        />

        <div className="governance-issue-summary">
          <div>
            <span className="governance-issue-dot high" />
            <strong>
              {complianceIssues.filter(
                (item) => item.severity === "High"
              ).length}
            </strong>
            <span>High Severity</span>
          </div>

          <div>
            <span className="governance-issue-dot medium" />
            <strong>
              {complianceIssues.filter(
                (item) => item.severity === "Medium"
              ).length}
            </strong>
            <span>Medium Severity</span>
          </div>

          <div>
            <span className="governance-issue-dot low" />
            <strong>
              {complianceIssues.filter(
                (item) => item.severity === "Low"
              ).length}
            </strong>
            <span>Low Severity</span>
          </div>
        </div>

        <div className="governance-toolbar">
          <span className="governance-toolbar-note">
            Compliance issue register
          </span>

          <select
            className="governance-filter"
            value={issueFilter}
            onChange={(e) => setIssueFilter(e.target.value)}
            aria-label="Filter compliance issues"
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="governance-table-wrapper">
          <table className="governance-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Issue ID</th>
                <th>Category</th>
                <th>Severity</th>
                <th>Department</th>
                <th>Reported</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  <td className="governance-policy-name">
                    {issue.title}
                  </td>
                  <td>{issue.id}</td>
                  <td>{issue.category}</td>
                  <td>
                    <span
                      className={`governance-severity ${issue.severity.toLowerCase()}`}
                    >
                      {issue.severity}
                    </span>
                  </td>
                  <td>{issue.department}</td>
                  <td>{issue.reported}</td>
                  <td>
                    <StatusBadge status={issue.status} />
                  </td>
                </tr>
              ))}

              {filteredIssues.length === 0 && (
                <tr>
                  <td colSpan="7" className="governance-empty">
                    No compliance issues found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* RISK ASSESSMENT */}

      <section className="governance-panel">
        <SectionHeader
          title="Risk Assessment"
          description="Identified risks requiring organizational attention"
          badge={`${riskData.length} tracked risks`}
        />

        <div className="governance-risk-grid">
          {riskData.map((risk) => (
            <div
              className="governance-risk-card"
              key={risk.title}
            >
              <div className="governance-risk-card-top">
                <span
                  className={`governance-risk-level ${risk.level.toLowerCase()}`}
                >
                  {risk.level} Risk
                </span>
                <span className="governance-risk-category">
                  {risk.category}
                </span>
              </div>

              <h3>{risk.title}</h3>
              <p>{risk.description}</p>

              <div className="governance-risk-owner">
                <span>Responsible team</span>
                <strong>{risk.owner}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTION ITEMS */}

      <section className="governance-panel governance-actions-panel">
        <SectionHeader
          title="Governance Action Items"
          description="Follow up on outstanding compliance responsibilities"
          badge={`${completedActions}/${actions.length} completed`}
        />

        <div className="governance-action-list">
          {actions.map((item, index) => (
            <label
              className={`governance-action-row ${
                item.completed ? "completed" : ""
              }`}
              key={item.title}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleAction(index)}
              />

              <div className="governance-action-content">
                <strong>{item.title}</strong>
                <span>{item.department}</span>
              </div>

              <span
                className={`governance-priority ${item.priority.toLowerCase()}`}
              >
                {item.priority}
              </span>

              <span className="governance-action-due">
                {item.due}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Governance;
