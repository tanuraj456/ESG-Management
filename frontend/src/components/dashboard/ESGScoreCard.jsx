
import { useState } from "react";
import {
  Leaf,
  Heart,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Download,
  CalendarDays,
  ArrowUpRight,
  Target,
} from "lucide-react";

const scores = [
  {
    title: "Environmental",
    score: 82,
    change: "+5.2%",
    description: "Strong environmental performance",
    color: "#22a06b",
    icon: Leaf,
  },
  {
    title: "Social",
    score: 74,
    change: "+3.8%",
    description: "Room for improvement",
    color: "#3b82f6",
    icon: Heart,
  },
  {
    title: "Governance",
    score: 88,
    change: "+7.1%",
    description: "Excellent compliance standards",
    color: "#8b5cf6",
    icon: ShieldCheck,
  },
  {
    title: "Overall ESG",
    score: 81,
    change: "+5.4%",
    description: "Above industry average",
    color: "#eab308",
    icon: TrendingUp,
  },
];

const trendData = {
  "6 months": [
    { month: "May", score: 68 },
    { month: "Jun", score: 71 },
    { month: "Jul", score: 70 },
    { month: "Aug", score: 75 },
    { month: "Sep", score: 78 },
    { month: "Oct", score: 81 },
  ],
  "12 months": [
    { month: "Nov", score: 58 },
    { month: "Dec", score: 62 },
    { month: "Jan", score: 64 },
    { month: "Feb", score: 61 },
    { month: "Mar", score: 66 },
    { month: "Apr", score: 68 },
    { month: "May", score: 68 },
    { month: "Jun", score: 71 },
    { month: "Jul", score: 70 },
    { month: "Aug", score: 75 },
    { month: "Sep", score: 78 },
    { month: "Oct", score: 81 },
  ],
};

const departments = [
  { name: "Engineering", score: 91, employees: 42 },
  { name: "Human Resources", score: 86, employees: 18 },
  { name: "Operations", score: 79, employees: 35 },
  { name: "Marketing", score: 76, employees: 24 },
  { name: "Finance", score: 72, employees: 16 },
];

const categoryDetails = [
  {
    name: "Carbon Emissions",
    value: "390 t",
    target: "500 t",
    progress: 78,
    status: "On track",
    color: "#22a06b",
  },
  {
    name: "Employee Engagement",
    value: "74%",
    target: "90%",
    progress: 82,
    status: "Improving",
    color: "#3b82f6",
  },
  {
    name: "Policy Compliance",
    value: "88%",
    target: "95%",
    progress: 93,
    status: "On track",
    color: "#8b5cf6",
  },
];

function ESGPerformance() {
  const [period, setPeriod] = useState("12 months");

  const currentTrend = trendData[period];

  const exportReport = () => {
    const csv = [
      ["Category", "Score", "Change"],
      ...scores.map((item) => [
        item.title,
        item.score,
        item.change,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecospher-esg-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="esg-page">
      <div className="esg-page-header">
        <div>
          <div className="esg-eyebrow">
            <span className="esg-eyebrow-dot" />
            SUSTAINABILITY OVERVIEW
          </div>

          <h1>ESG Performance</h1>

          <p>
            Track your organization's sustainability health
            and monitor progress toward your ESG goals.
          </p>
        </div>

        <div className="esg-header-actions">
          <div className="esg-demo-badge">
            <span /> Demo data
          </div>

          <button
            className="esg-export-button"
            onClick={exportReport}
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      <div className="esg-score-grid">
        {scores.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="esg-score-card"
              key={item.title}
              style={{ "--score-color": item.color }}
            >
              <div className="esg-score-card-top">
                <div className="esg-score-icon">
                  <Icon size={20} />
                </div>

                <span className="esg-score-change">
                  <TrendingUp size={14} />
                  {item.change}
                </span>
              </div>

              <p className="esg-score-label">{item.title}</p>

              <div className="esg-score-value">
                {item.score}
                <span>/100</span>
              </div>

              <div className="esg-progress-track">
                <div
                  className="esg-progress-fill"
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="esg-score-description">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="esg-main-grid">
        <section className="esg-panel esg-trend-panel">
          <div className="esg-panel-header">
            <div>
              <h2>ESG Score Trend</h2>
              <p>Performance over time</p>
            </div>

            <div className="esg-period-select">
              <CalendarDays size={15} />

              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
              >
                <option>6 months</option>
                <option>12 months</option>
              </select>
            </div>
          </div>

          <div className="esg-chart">
            <div className="esg-chart-grid">
              {[100, 75, 50, 25, 0].map((value) => (
                <div className="esg-chart-row" key={value}>
                  <span>{value}</span>
                  <div />
                </div>
              ))}
            </div>

            <div className="esg-chart-bars">
              {currentTrend.map((item) => (
                <div className="esg-chart-column" key={item.month}>
                  <div
                    className="esg-chart-bar"
                    style={{ height: `${item.score}%` }}
                    title={`${item.month}: ${item.score}/100`}
                  >
                    <span>{item.score}</span>
                  </div>

                  <span className="esg-chart-month">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="esg-chart-footer">
            <span>
              <span className="esg-legend-dot" />
              Overall ESG score
            </span>

            <strong>
              +{currentTrend[currentTrend.length - 1].score -
                currentTrend[0].score} points
            </strong>
          </div>
        </section>

        <section className="esg-panel">
          <div className="esg-panel-header">
            <div>
              <h2>Performance Breakdown</h2>
              <p>Progress against key targets</p>
            </div>

            <Target size={20} className="esg-panel-icon" />
          </div>

          <div className="esg-breakdown-list">
            {categoryDetails.map((item) => (
              <div className="esg-breakdown-item" key={item.name}>
                <div className="esg-breakdown-heading">
                  <strong>{item.name}</strong>
                  <span>{item.progress}%</span>
                </div>

                <div className="esg-progress-track">
                  <div
                    className="esg-progress-fill"
                    style={{
                      width: `${item.progress}%`,
                      background: item.color,
                    }}
                  />
                </div>

                <div className="esg-breakdown-footer">
                  <span>
                    {item.value} / {item.target}
                  </span>

                  <span className="esg-status">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="esg-panel esg-department-panel">
        <div className="esg-panel-header">
          <div>
            <h2>Department Performance</h2>
            <p>Compare sustainability scores across teams</p>
          </div>

          <span className="esg-table-count">
            {departments.length} departments
          </span>
        </div>

        <div className="esg-table-wrapper">
          <table className="esg-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Employees</th>
                <th>ESG Score</th>
                <th>Performance</th>
                <th>Trend</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((department, index) => (
                <tr key={department.name}>
                  <td>
                    <div className="esg-department-name">
                      <span className="esg-department-number">
                        0{index + 1}
                      </span>
                      <strong>{department.name}</strong>
                    </div>
                  </td>

                  <td>{department.employees}</td>

                  <td>
                    <strong>{department.score}/100</strong>
                  </td>

                  <td>
                    <div className="esg-table-progress">
                      <div
                        style={{ width: `${department.score}%` }}
                      />
                    </div>
                  </td>

                  <td>
                    <span className="esg-trend-positive">
                      <ArrowUpRight size={15} />
                      Improving
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="esg-demo-note">
        <span className="esg-demo-note-icon">
          <TrendingDown size={17} />
        </span>

        <div>
          <strong>Demo environment</strong>
          <p>
            The figures on this page are sample data for previewing
            EcoSphere. They can later be connected to your backend
            and real ESG records.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ESGPerformance;
