
import { useMemo, useState } from "react";
import {
    Download,
    FileText,
    TrendingUp,
    TrendingDown,
    Leaf,
    Users,
    ShieldCheck,
    Target,
    CalendarDays,
    ChevronDown,
    BarChart3,
    Activity,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Building2,
  } from "lucide-react";

const monthlyData = [
  { month: "Jan", environmental: 62, social: 58, governance: 71 },
  { month: "Feb", environmental: 65, social: 61, governance: 73 },
  { month: "Mar", environmental: 68, social: 64, governance: 74 },
  { month: "Apr", environmental: 66, social: 67, governance: 76 },
  { month: "May", environmental: 72, social: 69, governance: 78 },
  { month: "Jun", environmental: 75, social: 72, governance: 79 },
  { month: "Jul", environmental: 78, social: 74, governance: 82 },
  { month: "Aug", environmental: 80, social: 78, governance: 84 },
  { month: "Sep", environmental: 83, social: 81, governance: 86 },
  { month: "Oct", environmental: 87, social: 84, governance: 89 },
  { month: "Nov", environmental: 89, social: 86, governance: 91 },
  { month: "Dec", environmental: 92, social: 89, governance: 93 },
];

const departmentData = [
  { name: "Engineering", score: 91, employees: 42, participation: 88 },
  { name: "Human Resources", score: 87, employees: 18, participation: 94 },
  { name: "Finance", score: 82, employees: 24, participation: 79 },
  { name: "Marketing", score: 85, employees: 21, participation: 86 },
  { name: "Operations", score: 78, employees: 35, participation: 72 },
  { name: "Sustainability", score: 96, employees: 12, participation: 98 },
];

const complianceData = [
  {
    name: "Environmental Policy",
    category: "Environmental",
    status: "Compliant",
    dueDate: "2026-11-15",
    owner: "Operations",
  },
  {
    name: "Workplace Safety",
    category: "Social",
    status: "Compliant",
    dueDate: "2026-11-20",
    owner: "Human Resources",
  },
  {
    name: "Data Privacy",
    category: "Governance",
    status: "Pending",
    dueDate: "2026-10-20",
    owner: "Engineering",
  },
  {
    name: "Supplier Code of Conduct",
    category: "Governance",
    status: "Under Review",
    dueDate: "2026-10-25",
    owner: "Finance",
  },
  {
    name: "Waste Management",
    category: "Environmental",
    status: "Compliant",
    dueDate: "2026-12-01",
    owner: "Operations",
  },
  {
    name: "Employee Wellbeing",
    category: "Social",
    status: "Pending",
    dueDate: "2026-10-18",
    owner: "Human Resources",
  },
];

const participationData = [
  { activity: "Sustainability Challenges", participants: 86, completion: 78 },
  { activity: "Green Commute Program", participants: 72, completion: 84 },
  { activity: "Community Volunteering", participants: 64, completion: 69 },
  { activity: "Energy Saving Initiative", participants: 91, completion: 88 },
  { activity: "Learning & Awareness", participants: 78, completion: 92 },
];

const periods = ["Monthly", "Quarterly", "Yearly"];

function getPeriodData(period) {
  if (period === "Quarterly") {
    return [
      {
        month: "Q1",
        environmental: 65,
        social: 61,
        governance: 73,
      },
      {
        month: "Q2",
        environmental: 71,
        social: 69,
        governance: 78,
      },
      {
        month: "Q3",
        environmental: 80,
        social: 78,
        governance: 84,
      },
      {
        month: "Q4",
        environmental: 89,
        social: 86,
        governance: 91,
      },
    ];
  }

  if (period === "Yearly") {
    return [
      {
        month: "2023",
        environmental: 58,
        social: 55,
        governance: 64,
      },
      {
        month: "2024",
        environmental: 67,
        social: 63,
        governance: 73,
      },
      {
        month: "2025",
        environmental: 76,
        social: 72,
        governance: 82,
      },
      {
        month: "2026",
        environmental: 87,
        social: 84,
        governance: 89,
      },
    ];
  }

  return monthlyData;
}

function exportCSV(filename, headers, rows) {
  const content = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([content], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function ReportMetric({ icon: Icon, label, value, change, positive, note }) {
  return (
    <div className="reports-metric-card">
      <div className="reports-metric-top">
        <div className="reports-metric-icon">
          <Icon size={20} />
        </div>
        <span className={`reports-metric-change ${positive ? "positive" : "negative"}`}>
          {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </span>
      </div>
      <span className="reports-metric-label">{label}</span>
      <strong className="reports-metric-value">{value}</strong>
      <span className="reports-metric-note">{note}</span>
    </div>
  );
}

function PerformanceChart({ data }) {
  const series = [
    { key: "environmental", label: "Environmental", color: "environmental" },
    { key: "social", label: "Social", color: "social" },
    { key: "governance", label: "Governance", color: "governance" },
  ];

  return (
    <div className="reports-chart">
      <div className="reports-chart-grid">
        {[100, 75, 50, 25, 0].map((value) => (
          <div className="reports-chart-row" key={value}>
            <span className="reports-axis-label">{value}</span>
            <div className="reports-grid-line"></div>
          </div>
        ))}
      </div>

      <div className="reports-chart-columns">
        {data.map((item) => (
          <div className="reports-chart-column" key={item.month}>
            <div className="reports-bars">
              {series.map((seriesItem) => (
                <div
                  key={seriesItem.key}
                  className={`reports-bar ${seriesItem.color}`}
                  style={{ height: `${item[seriesItem.key]}%` }}
                  title={`${seriesItem.label}: ${item[seriesItem.key]}%`}
                ></div>
              ))}
            </div>
            <span className="reports-x-label">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reports() {
  const [period, setPeriod] = useState("Monthly");
  const [activeTab, setActiveTab] = useState("overview");
  const [complianceFilter, setComplianceFilter] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  const chartData = useMemo(() => getPeriodData(period), [period]);

  const filteredDepartments = useMemo(() => {
    if (selectedDepartment === "All Departments") {
      return departmentData;
    }

    return departmentData.filter(
      (department) => department.name === selectedDepartment
    );
  }, [selectedDepartment]);

  const filteredCompliance = useMemo(() => {
    if (complianceFilter === "All") return complianceData;

    return complianceData.filter(
      (item) => item.status === complianceFilter
    );
  }, [complianceFilter]);

  const compliantCount = complianceData.filter(
    (item) => item.status === "Compliant"
  ).length;

  const pendingCount = complianceData.filter(
    (item) => item.status === "Pending"
  ).length;

  const underReviewCount = complianceData.filter(
    (item) => item.status === "Under Review"
  ).length;

  const averageDepartmentScore = Math.round(
    departmentData.reduce((sum, item) => sum + item.score, 0) /
      departmentData.length
  );

  function exportOverview() {
    exportCSV(
      "ecospher-esg-overview.csv",
      ["Period", "Environmental", "Social", "Governance"],
      chartData.map((item) => [
        item.month,
        item.environmental,
        item.social,
        item.governance,
      ])
    );
  }

  function exportDepartments() {
    exportCSV(
      "ecospher-department-report.csv",
      ["Department", "ESG Score", "Employees", "Participation"],
      filteredDepartments.map((item) => [
        item.name,
        item.score,
        item.employees,
        item.participation,
      ])
    );
  }

  function exportCompliance() {
    exportCSV(
      "ecospher-compliance-report.csv",
      ["Policy", "Category", "Status", "Due Date", "Owner"],
      filteredCompliance.map((item) => [
        item.name,
        item.category,
        item.status,
        item.dueDate,
        item.owner,
      ])
    );
  }

  function exportParticipation() {
    exportCSV(
      "ecospher-participation-report.csv",
      ["Activity", "Participants", "Completion"],
      participationData.map((item) => [
        item.activity,
        item.participants,
        item.completion,
      ])
    );
  }

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <div className="reports-breadcrumb">
            Admin <span>/</span> Reports & Analytics
          </div>
          <h1>Reports & Analytics</h1>
          <p>
            Monitor ESG performance, workforce engagement, and compliance
            across your organization.
          </p>
        </div>

        <div className="reports-header-actions">
          <div className="reports-period-select">
            <CalendarDays size={16} />
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              aria-label="Report period"
            >
              {periods.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>

          <button className="reports-export-btn" onClick={exportOverview}>
            <Download size={17} />
            Export Report
          </button>
        </div>
      </div>

      <div className="reports-metrics-grid">
        <ReportMetric
          icon={BarChart3}
          label="Overall ESG Score"
          value={`${averageDepartmentScore}%`}
          change="+8.4%"
          positive
          note="Compared with previous period"
        />
        <ReportMetric
          icon={Leaf}
          label="Environmental Score"
          value="87%"
          change="+6.2%"
          positive
          note="Resource efficiency improved"
        />
        <ReportMetric
          icon={Users}
          label="Employee Participation"
          value="84%"
          change="+5.7%"
          positive
          note="Across active initiatives"
        />
        <ReportMetric
          icon={ShieldCheck}
          label="Compliance Rate"
          value={`${Math.round((compliantCount / complianceData.length) * 100)}%`}
          change="+2.1%"
          positive
          note={`${compliantCount} of ${complianceData.length} policies compliant`}
        />
      </div>

      <div className="reports-tabs">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          <Activity size={16} />
          Overview
        </button>
        <button
          className={activeTab === "departments" ? "active" : ""}
          onClick={() => setActiveTab("departments")}
        >
          <Building2 size={16} />
          Departments
        </button>
        <button
          className={activeTab === "participation" ? "active" : ""}
          onClick={() => setActiveTab("participation")}
        >
          <Users size={16} />
          Participation
        </button>
        <button
          className={activeTab === "compliance" ? "active" : ""}
          onClick={() => setActiveTab("compliance")}
        >
          <ShieldCheck size={16} />
          Compliance
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="reports-content">
          <section className="reports-panel reports-performance-panel">
            <div className="reports-panel-header">
              <div>
                <h2>ESG Performance Trends</h2>
                <p>Performance breakdown across the selected period</p>
              </div>
              <button
                className="reports-icon-button"
                onClick={exportOverview}
                title="Export performance data"
              >
                <Download size={17} />
              </button>
            </div>

            <div className="reports-legend">
              <span><i className="environmental"></i>Environmental</span>
              <span><i className="social"></i>Social</span>
              <span><i className="governance"></i>Governance</span>
            </div>

            <PerformanceChart data={chartData} />

            <div className="reports-chart-footer">
              <div>
                <span className="reports-footer-label">Environmental</span>
                <strong>87%</strong>
              </div>
              <div>
                <span className="reports-footer-label">Social</span>
                <strong>84%</strong>
              </div>
              <div>
                <span className="reports-footer-label">Governance</span>
                <strong>89%</strong>
              </div>
            </div>
          </section>

          <section className="reports-panel reports-highlights-panel">
            <div className="reports-panel-header">
              <div>
                <h2>Key Highlights</h2>
                <p>Important insights from your ESG data</p>
              </div>
              <Target size={19} className="reports-heading-icon" />
            </div>

            <div className="reports-highlight-item">
              <div className="reports-highlight-icon green">
                <TrendingUp size={18} />
              </div>
              <div>
                <strong>Strong ESG improvement</strong>
                <p>
                  Overall performance has improved steadily across the
                  reporting period.
                </p>
              </div>
            </div>

            <div className="reports-highlight-item">
              <div className="reports-highlight-icon blue">
                <Users size={18} />
              </div>
              <div>
                <strong>High employee engagement</strong>
                <p>
                  Employee participation remains strong across sustainability
                  initiatives.
                </p>
              </div>
            </div>

            <div className="reports-highlight-item">
              <div className="reports-highlight-icon amber">
                <AlertTriangle size={18} />
              </div>
              <div>
                <strong>Compliance actions required</strong>
                <p>
                  {pendingCount + underReviewCount} policies need follow-up or
                  review.
                </p>
              </div>
            </div>

            <div className="reports-highlight-item">
              <div className="reports-highlight-icon purple">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <strong>Top-performing department</strong>
                <p>
                  Sustainability leads with a 96% ESG score in the current
                  demo dataset.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === "departments" && (
        <section className="reports-panel reports-table-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Department Performance</h2>
              <p>Compare ESG results and participation by department</p>
            </div>

            <div className="reports-panel-actions">
              <select
                value={selectedDepartment}
                onChange={(event) =>
                  setSelectedDepartment(event.target.value)
                }
                aria-label="Filter department"
              >
                <option>All Departments</option>
                {departmentData.map((department) => (
                  <option key={department.name}>{department.name}</option>
                ))}
              </select>
              <button
                className="reports-icon-button"
                onClick={exportDepartments}
                title="Export department report"
              >
                <Download size={17} />
              </button>
            </div>
          </div>

          <div className="reports-department-grid">
            {filteredDepartments.map((department) => (
              <div className="reports-department-card" key={department.name}>
                <div className="reports-department-top">
                  <div className="reports-department-icon">
                    <Building2 size={19} />
                  </div>
                  <span className="reports-department-tag">Department</span>
                </div>

                <h3>{department.name}</h3>
                <div className="reports-department-score">
                  <strong>{department.score}%</strong>
                  <span>ESG Score</span>
                </div>

                <div className="reports-progress-line">
                  <div
                    style={{ width: `${department.score}%` }}
                  ></div>
                </div>

                <div className="reports-department-meta">
                  <span>{department.employees} employees</span>
                  <span>{department.participation}% participation</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "participation" && (
        <section className="reports-panel reports-table-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Employee Participation</h2>
              <p>Engagement and completion across ESG activities</p>
            </div>
            <button
              className="reports-icon-button"
              onClick={exportParticipation}
              title="Export participation report"
            >
              <Download size={17} />
            </button>
          </div>

          <div className="reports-participation-list">
            {participationData.map((item) => (
              <div className="reports-participation-row" key={item.activity}>
                <div className="reports-participation-info">
                  <div className="reports-participation-icon">
                    <Users size={18} />
                  </div>
                  <div>
                    <strong>{item.activity}</strong>
                    <span>{item.participants} participants</span>
                  </div>
                </div>

                <div className="reports-participation-progress">
                  <div className="reports-participation-track">
                    <div style={{ width: `${item.completion}%` }}></div>
                  </div>
                  <strong>{item.completion}%</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "compliance" && (
        <section className="reports-panel reports-table-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Compliance Overview</h2>
              <p>Track policy status, ownership, and upcoming deadlines</p>
            </div>

            <div className="reports-panel-actions">
              <select
                value={complianceFilter}
                onChange={(event) => setComplianceFilter(event.target.value)}
                aria-label="Filter compliance status"
              >
                <option>All</option>
                <option>Compliant</option>
                <option>Pending</option>
                <option>Under Review</option>
              </select>
              <button
                className="reports-icon-button"
                onClick={exportCompliance}
                title="Export compliance report"
              >
                <Download size={17} />
              </button>
            </div>
          </div>

          <div className="reports-compliance-summary">
            <div>
              <CheckCircle2 size={18} />
              <span>Compliant</span>
              <strong>{compliantCount}</strong>
            </div>
            <div>
              <Clock size={18} />
              <span>Pending</span>
              <strong>{pendingCount}</strong>
            </div>
            <div>
              <FileText size={18} />
              <span>Under Review</span>
              <strong>{underReviewCount}</strong>
            </div>
          </div>

          <div className="reports-table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Policy / Requirement</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompliance.map((item) => (
                  <tr key={item.name}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <span
                        className={`reports-compliance-status ${item.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {new Date(`${item.dueDate}T00:00:00`).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td>{item.owner}</td>
                  </tr>
                ))}
                {filteredCompliance.length === 0 && (
                  <tr>
                    <td colSpan="5" className="reports-empty">
                      No compliance records match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div className="reports-disclaimer">
        <Activity size={15} />
        <span>
          Reports currently display illustrative demo data. Live organizational
          analytics will be available after backend integration.
        </span>
      </div>
    </div>
  );
}
