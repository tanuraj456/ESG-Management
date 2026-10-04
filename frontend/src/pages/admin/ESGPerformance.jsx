
import React, { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Download,
  Heart,
  Leaf,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";

const scoreData = [
  {
    title: "Environmental",
    score: 82,
    change: 5.2,
    description: "Strong environmental performance",
    color: "#16a34a",
    icon: Leaf,
  },
  {
    title: "Social",
    score: 74,
    change: 3.8,
    description: "Room for improvement",
    color: "#2563eb",
    icon: Heart,
  },
  {
    title: "Governance",
    score: 88,
    change: 6.4,
    description: "Excellent compliance standards",
    color: "#7c3aed",
    icon: ShieldCheck,
  },
];

const monthlyData = [
  { month: "Jan", environmental: 72, social: 65, governance: 78 },
  { month: "Feb", environmental: 74, social: 67, governance: 80 },
  { month: "Mar", environmental: 75, social: 68, governance: 81 },
  { month: "Apr", environmental: 77, social: 69, governance: 82 },
  { month: "May", environmental: 76, social: 70, governance: 83 },
  { month: "Jun", environmental: 78, social: 71, governance: 84 },
  { month: "Jul", environmental: 79, social: 72, governance: 85 },
  { month: "Aug", environmental: 80, social: 72, governance: 86 },
  { month: "Sep", environmental: 81, social: 73, governance: 87 },
  { month: "Oct", environmental: 82, social: 74, governance: 88 },
];

const departmentData = [
  { name: "Engineering", score: 92, employees: 48 },
  { name: "Human Resources", score: 86, employees: 12 },
  { name: "Operations", score: 81, employees: 32 },
  { name: "Marketing", score: 76, employees: 18 },
  { name: "Finance", score: 73, employees: 14 },
];

const recommendations = [
  {
    title: "Improve employee participation",
    description:
      "Increase participation in sustainability challenges and employee engagement programs.",
    category: "Social",
    priority: "High",
  },
  {
    title: "Reduce energy consumption",
    description:
      "Focus on energy-efficient equipment and renewable energy adoption.",
    category: "Environmental",
    priority: "Medium",
  },
  {
    title: "Strengthen compliance training",
    description:
      "Improve policy awareness and complete pending governance training.",
    category: "Governance",
    priority: "Medium",
  },
];

function ScoreCard({ item }) {
  const Icon = item.icon;
  const ChangeIcon = item.change >= 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      className="esg-score-card"
      style={{ "--esg-accent": item.color }}
    >
      <div className="esg-score-card-top">
        <div className="esg-score-icon">
          <Icon size={21} />
        </div>

        <span className="esg-score-change">
          <ChangeIcon size={15} />
          {item.change}%
        </span>
      </div>

      <p className="esg-score-label">{item.title} Score</p>

      <div className="esg-score-number">
        {item.score}
        <span>/100</span>
      </div>

      <div className="esg-progress-track">
        <div
          className="esg-progress-fill"
          style={{ width: `${item.score}%` }}
        />
      </div>

      <p className="esg-score-description">{item.description}</p>
    </div>
  );
}

function TrendChart({ data }) {
  const [visibleLines, setVisibleLines] = useState({
    environmental: true,
    social: true,
    governance: true,
  });

  const width = 700;
  const height = 270;
  const paddingX = 35;
  const paddingY = 25;

  const colors = {
    environmental: "#16a34a",
    social: "#3b82f6",
    governance: "#8b5cf6",
  };

  const getCoordinates = (key) =>
    data
      .map((item, index) => {
        const x =
          paddingX +
          (index * (width - paddingX * 2)) / (data.length - 1);

        const y =
          height -
          paddingY -
          (item[key] / 100) * (height - paddingY * 2);

        return `${x},${y}`;
      })
      .join(" ");

  return (
    <>
      <div className="esg-chart-legend">
        {Object.entries(colors).map(([key, color]) => (
          <button
            type="button"
            key={key}
            className={`esg-legend-item ${
              visibleLines[key] ? "active" : ""
            }`}
            onClick={() =>
              setVisibleLines((previous) => ({
                ...previous,
                [key]: !previous[key],
              }))
            }
          >
            <span style={{ background: color }} />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="esg-chart-scroll">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="esg-trend-svg"
          role="img"
          aria-label="Monthly ESG performance trends"
        >
          {[20, 40, 60, 80, 100].map((value) => {
            const y =
              height -
              paddingY -
              (value / 100) * (height - paddingY * 2);

            return (
              <g key={value}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="var(--esg-border)"
                  strokeDasharray="5 5"
                />
                <text
                  x="0"
                  y={y + 4}
                  fill="var(--esg-muted)"
                  fontSize="11"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {Object.entries(colors).map(([key, color]) =>
            visibleLines[key] ? (
              <g key={key}>
                <polyline
                  points={getCoordinates(key)}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {data.map((item, index) => {
                  const x =
                    paddingX +
                    (index * (width - paddingX * 2)) /
                      (data.length - 1);

                  const y =
                    height -
                    paddingY -
                    (item[key] / 100) * (height - paddingY * 2);

                  return (
                    <circle
                      key={`${key}-${item.month}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={color}
                      stroke="var(--esg-card)"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            ) : null
          )}
        </svg>

        <div className="esg-month-labels">
          {data.map((item) => (
            <span key={item.month}>{item.month}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ESGPerformance() {
  const [period, setPeriod] = useState("year");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredDepartments =
    selectedDepartment === "All"
      ? departmentData
      : departmentData.filter(
          (item) => item.name === selectedDepartment
        );

  const handleExport = () => {
    const rows = [
      ["Category", "Score", "Change"],
      ...scoreData.map((item) => [
        item.title,
        item.score,
        `${item.change}%`,
      ]),
      [],
      ["Department", "ESG Score", "Employees"],
      ...departmentData.map((item) => [
        item.name,
        item.score,
        item.employees,
      ]),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecos-phere-esg-performance.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="esg-performance-page">
      <style>{`
        .esg-performance-page {
          --esg-bg: #f4f7f5;
          --esg-card: #ffffff;
          --esg-text: #173c2b;
          --esg-muted: #64796e;
          --esg-border: #dce7e0;
          --esg-green: #16834e;
          width: 100%;
          min-height: 100%;
          padding: 32px;
          color: var(--esg-text);
          background: var(--esg-bg);
          font-family: inherit;
          box-sizing: border-box;
        }

        .esg-performance-page * {
          box-sizing: border-box;
        }

        .esg-performance-page .esg-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 28px;
        }

        .esg-performance-page .esg-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--esg-green);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .esg-performance-page .esg-eyebrow-dot {
          width: 9px;
          height: 9px;
          background: #20a464;
          border-radius: 50%;
        }

        .esg-performance-page h1 {
          color: var(--esg-text);
          font-size: clamp(26px, 3vw, 34px);
          letter-spacing: -0.7px;
          margin: 0 0 8px;
        }

        .esg-performance-page .esg-page-header p {
          color: var(--esg-muted);
          font-size: 14px;
          margin: 0;
          line-height: 1.6;
        }

        .esg-performance-page .esg-export-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 17px;
          color: #ffffff;
          background: #16834e;
          border: 0;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .esg-performance-page .esg-export-button:hover {
          background: #116c40;
        }

        .esg-performance-page .esg-overall-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 25px 28px;
          margin-bottom: 22px;
          color: #ffffff;
          background: linear-gradient(115deg, #145c3b, #16834e);
          border-radius: 16px;
        }

        .esg-performance-page .esg-overall-banner h2 {
          margin: 0 0 7px;
          font-size: 18px;
          color: #ffffff;
        }

        .esg-performance-page .esg-overall-banner p {
          margin: 0;
          color: #d5f0df;
          font-size: 13px;
        }

        .esg-performance-page .esg-overall-score {
          display: flex;
          align-items: baseline;
          gap: 8px;
          white-space: nowrap;
        }

        .esg-performance-page .esg-overall-score strong {
          font-size: 48px;
          line-height: 1;
          color: #ffffff;
        }

        .esg-performance-page .esg-overall-score span {
          color: #d5f0df;
          font-size: 14px;
        }

        .esg-performance-page .esg-score-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 24px;
        }

        .esg-performance-page .esg-score-card {
          min-width: 0;
          padding: 22px;
          background: var(--esg-card);
          border: 1px solid var(--esg-border);
          border-radius: 15px;
          border-top: 4px solid var(--esg-accent);
          box-shadow: 0 3px 12px rgba(20, 50, 35, 0.04);
        }

        .esg-performance-page .esg-score-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 19px;
        }

        .esg-performance-page .esg-score-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          color: var(--esg-accent);
          background: color-mix(in srgb, var(--esg-accent) 11%, white);
          border-radius: 12px;
        }

        .esg-performance-page .esg-score-change {
          display: flex;
          align-items: center;
          gap: 3px;
          color: #16834e;
          font-size: 12px;
          font-weight: 700;
        }

        .esg-performance-page .esg-score-label {
          margin: 0 0 8px;
          color: var(--esg-muted);
          font-size: 14px;
        }

        .esg-performance-page .esg-score-number {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 16px;
          color: var(--esg-accent);
          font-size: 34px;
          font-weight: 750;
        }

        .esg-performance-page .esg-score-number span {
          color: var(--esg-muted);
          font-size: 13px;
          font-weight: 400;
        }

        .esg-performance-page .esg-progress-track {
          width: 100%;
          height: 7px;
          overflow: hidden;
          background: var(--esg-border);
          border-radius: 20px;
        }

        .esg-performance-page .esg-progress-fill {
          height: 100%;
          background: var(--esg-accent);
          border-radius: inherit;
        }

        .esg-performance-page .esg-score-description {
          margin: 13px 0 0;
          color: var(--esg-muted);
          font-size: 12px;
        }

        .esg-performance-page .esg-panel {
          min-width: 0;
          padding: 24px;
          margin-bottom: 22px;
          background: var(--esg-card);
          border: 1px solid var(--esg-border);
          border-radius: 16px;
          box-shadow: 0 3px 12px rgba(20, 50, 35, 0.04);
        }

        .esg-performance-page .esg-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 22px;
        }

        .esg-performance-page .esg-panel-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          color: var(--esg-text);
          font-size: 18px;
          font-weight: 700;
        }

        .esg-performance-page .esg-panel-title svg {
          color: #668b78;
        }

        .esg-performance-page .esg-period-select {
          padding: 9px 12px;
          color: var(--esg-text);
          background: var(--esg-bg);
          border: 1px solid var(--esg-border);
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          cursor: pointer;
        }

        .esg-performance-page .esg-chart-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 14px;
        }

        .esg-performance-page .esg-legend-item {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 10px;
          color: var(--esg-muted);
          background: var(--esg-bg);
          border: 1px solid var(--esg-border);
          border-radius: 7px;
          font-size: 12px;
          cursor: pointer;
          opacity: 0.55;
        }

        .esg-performance-page .esg-legend-item.active {
          opacity: 1;
          color: var(--esg-text);
        }

        .esg-performance-page .esg-legend-item span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .esg-performance-page .esg-chart-scroll {
          width: 100%;
          overflow-x: auto;
        }

        .esg-performance-page .esg-trend-svg {
          display: block;
          width: 100%;
          min-width: 550px;
          height: 270px;
          overflow: visible;
        }

        .esg-performance-page .esg-month-labels {
          display: grid;
          grid-template-columns: repeat(10, minmax(0, 1fr));
          min-width: 550px;
          padding: 0 20px;
          color: var(--esg-muted);
          font-size: 12px;
          text-align: center;
        }

        .esg-performance-page .esg-bottom-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 22px;
        }

        .esg-performance-page .esg-department-list {
          display: flex;
          flex-direction: column;
          gap: 19px;
        }

        .esg-performance-page .esg-department-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 48px;
          gap: 8px 16px;
          align-items: center;
        }

        .esg-performance-page .esg-department-name {
          color: var(--esg-text);
          font-size: 13px;
          font-weight: 600;
        }

        .esg-performance-page .esg-department-score {
          color: var(--esg-text);
          font-size: 13px;
          font-weight: 700;
          text-align: right;
        }

        .esg-performance-page .esg-department-track {
          grid-column: 1 / -1;
          height: 8px;
          overflow: hidden;
          background: var(--esg-border);
          border-radius: 20px;
        }

        .esg-performance-page .esg-department-fill {
          height: 100%;
          background: #279b60;
          border-radius: inherit;
        }

        .esg-performance-page .esg-recommendation {
          padding: 16px 0;
          border-bottom: 1px solid var(--esg-border);
        }

        .esg-performance-page .esg-recommendation:first-child {
          padding-top: 0;
        }

        .esg-performance-page .esg-recommendation:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }

        .esg-performance-page .esg-recommendation-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 7px;
        }

        .esg-performance-page .esg-recommendation h3 {
          margin: 0;
          color: var(--esg-text);
          font-size: 14px;
          line-height: 1.5;
        }

        .esg-performance-page .esg-recommendation p {
          margin: 0;
          color: var(--esg-muted);
          font-size: 12px;
          line-height: 1.6;
        }

        .esg-performance-page .esg-priority {
          flex-shrink: 0;
          padding: 5px 8px;
          color: #b45309;
          background: #fff7e6;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
        }

        .esg-performance-page .esg-priority.high {
          color: #b91c1c;
          background: #feecec;
        }

        .esg-performance-page .esg-category {
          display: inline-block;
          margin-top: 8px;
          color: var(--esg-green);
          font-size: 11px;
          font-weight: 700;
        }

        [data-theme="dark"] .esg-performance-page,
        .dark .esg-performance-page {
          --esg-bg: #0d1b16;
          --esg-card: #14251e;
          --esg-text: #e7f1eb;
          --esg-muted: #a0b5a9;
          --esg-border: #2a4437;
          --esg-green: #42c982;
        }

        [data-theme="dark"] .esg-performance-page .esg-score-icon,
        .dark .esg-performance-page .esg-score-icon {
          background: color-mix(in srgb, var(--esg-accent) 18%, #14251e);
        }

        @media (max-width: 1000px) {
          .esg-performance-page .esg-bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .esg-performance-page {
            padding: 20px 16px;
          }

          .esg-performance-page .esg-score-grid {
            grid-template-columns: 1fr;
          }

          .esg-performance-page .esg-overall-banner {
            align-items: flex-start;
            flex-direction: column;
          }

          .esg-performance-page .esg-panel {
            padding: 18px;
          }
        }
      `}</style>

      <header className="esg-page-header">
        <div>
          <div className="esg-eyebrow">
            <span className="esg-eyebrow-dot" />
            Performance Analytics
          </div>

          <h1>ESG Performance</h1>

          <p>
            Track your organization's sustainability health and progress.
          </p>
        </div>

        <button
          type="button"
          className="esg-export-button"
          onClick={handleExport}
        >
          <Download size={17} />
          Export Report
        </button>
      </header>

      <section className="esg-overall-banner">
        <div>
          <h2>Overall ESG Performance</h2>
          <p>
            Your organization is performing well across all ESG categories.
          </p>
        </div>

        <div className="esg-overall-score">
          <strong>81</strong>
          <span>/100</span>
        </div>
      </section>

      <section className="esg-score-grid">
        {scoreData.map((item) => (
          <ScoreCard key={item.title} item={item} />
        ))}
      </section>

      <section className="esg-panel">
        <div className="esg-panel-header">
          <h2 className="esg-panel-title">
            <TrendingUp size={20} />
            ESG Performance Trend
          </h2>

          <select
            className="esg-period-select"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            aria-label="Select reporting period"
          >
            <option value="year">Last 12 months</option>
            <option value="quarter">Last quarter</option>
            <option value="month">Current month</option>
          </select>
        </div>

        <TrendChart
          data={
            period === "quarter"
              ? monthlyData.slice(-3)
              : period === "month"
                ? monthlyData.slice(-1)
                : monthlyData
          }
        />
      </section>

      <div className="esg-bottom-grid">
        <section className="esg-panel">
          <div className="esg-panel-header">
            <h2 className="esg-panel-title">
              <BarChart3 size={20} />
              Department Performance
            </h2>

            <select
              className="esg-period-select"
              value={selectedDepartment}
              onChange={(event) =>
                setSelectedDepartment(event.target.value)
              }
              aria-label="Filter departments"
            >
              <option value="All">All departments</option>
              {departmentData.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="esg-department-list">
            {filteredDepartments.map((item) => (
              <div className="esg-department-row" key={item.name}>
                <span className="esg-department-name">
                  {item.name}
                </span>

                <span className="esg-department-score">
                  {item.score}
                </span>

                <div className="esg-department-track">
                  <div
                    className="esg-department-fill"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="esg-panel">
          <div className="esg-panel-header">
            <h2 className="esg-panel-title">
              <Target size={20} />
              Improvement Areas
            </h2>
          </div>

          {recommendations.map((item) => (
            <div className="esg-recommendation" key={item.title}>
              <div className="esg-recommendation-top">
                <h3>{item.title}</h3>

                <span
                  className={`esg-priority ${
                    item.priority === "High" ? "high" : ""
                  }`}
                >
                  {item.priority}
                </span>
              </div>

              <p>{item.description}</p>
              <span className="esg-category">{item.category}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
