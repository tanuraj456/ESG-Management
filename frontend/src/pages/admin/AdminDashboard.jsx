
import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  Leaf,
  Plus,
  ShieldCheck,
  TrendingUp,
  Users,
  Heart,
  Zap,
} from "lucide-react";

const initialActivities = [
  {
    id: 1,
    title: "Priya completed 'Zero Waste Week'",
    time: "Today, 10:30 AM",
    type: "success",
  },
  {
    id: 2,
    title: "New compliance issue in Logistics",
    time: "Today, 9:15 AM",
    type: "warning",
  },
  {
    id: 3,
    title: "42 Carbon Transactions logged",
    time: "Yesterday",
    type: "info",
  },
  {
    id: 4,
    title: "R&D acknowledged Anti-Corruption Policy",
    time: "Yesterday",
    type: "success",
  },
];

const departments = [
  { name: "Sales", score: 62 },
  { name: "Marketing", score: 84 },
  { name: "Logistics", score: 70 },
  { name: "Corporate", score: 96 },
  { name: "R&D", score: 65 },
];

const emissions = [
  { month: "Nov", value: 42 },
  { month: "Dec", value: 58 },
  { month: "Jan", value: 72 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 75 },
  { month: "Apr", value: 65 },
  { month: "May", value: 48 },
  { month: "Jun", value: 52 },
  { month: "Jul", value: 60 },
  { month: "Aug", value: 70 },
  { month: "Sep", value: 79 },
  { month: "Oct", value: 74 },
];

const initialTransactions = [];

function ScoreCard({ title, score, color, icon: Icon }) {
  return (
    <div className="admin-score-card" style={{ "--score-color": color }}>
      <div className="admin-score-heading">
        <span>{title}</span>
        <Icon size={19} />
      </div>

      <div className="admin-score-value">
        <strong>{score}</strong>
        <span>/ 100</span>
      </div>

      <div className="admin-score-track">
        <div
          className="admin-score-fill"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function EmissionsChart() {
  const width = 620;
  const height = 230;
  const paddingX = 18;
  const paddingY = 20;

  const points = emissions
    .map((item, index) => {
      const x =
        paddingX +
        (index * (width - paddingX * 2)) / (emissions.length - 1);

      const y =
        height -
        paddingY -
        (item.value / 100) * (height - paddingY * 2);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="admin-chart-area">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="admin-line-chart"
        role="img"
        aria-label="Monthly emissions trend"
      >
        {[25, 50, 75].map((value) => {
          const y =
            height -
            paddingY -
            (value / 100) * (height - paddingY * 2);

          return (
            <line
              key={value}
              x1="0"
              y1={y}
              x2={width}
              y2={y}
              stroke="var(--admin-border)"
              strokeDasharray="5 6"
            />
          );
        })}

        <polyline
          points={points}
          fill="none"
          stroke="#20a464"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {emissions.map((item, index) => {
          const x =
            paddingX +
            (index * (width - paddingX * 2)) / (emissions.length - 1);

          const y =
            height -
            paddingY -
            (item.value / 100) * (height - paddingY * 2);

          return (
            <circle
              key={item.month}
              cx={x}
              cy={y}
              r="4.5"
              fill="#20a464"
              stroke="var(--admin-card)"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      <div className="admin-chart-labels">
        {emissions.map((item) => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
    </div>
  );
}

function DepartmentChart() {
  return (
    <div className="admin-bar-chart">
      {departments.map((department) => (
        <div className="admin-bar-column" key={department.name}>
          <span className="admin-bar-value">{department.score}</span>

          <div className="admin-bar-track">
            <div
              className="admin-bar-fill"
              style={{ height: `${department.score}%` }}
              title={`${department.name}: ${department.score}/100`}
            />
          </div>

          <span className="admin-bar-label">{department.name}</span>
        </div>
      ))}
    </div>
  );
}

function ActivityIcon({ type }) {
  if (type === "warning") {
    return <AlertTriangle size={18} className="activity-warning" />;
  }

  if (type === "info") {
    return <BarChart3 size={18} className="activity-info" />;
  }

  return <CheckCircle2 size={18} className="activity-success" />;
}

export default function AdminDashboard() {
  const [activities, setActivities] = useState(initialActivities);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showTransactionForm, setShowTransactionForm] = useState(true);
  const [department, setDepartment] = useState("Engineering");
  const [carbonAmount, setCarbonAmount] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const handleSaveTransaction = (event) => {
    event.preventDefault();

    const amount = Number(carbonAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormMessage("Please enter a valid carbon amount greater than zero.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      department,
      amount,
      time: "Just now",
    };

    setTransactions((previous) => [newTransaction, ...previous]);

    setActivities((previous) => [
      {
        id: Date.now(),
        title: `${amount} tonnes of carbon logged for ${department}`,
        time: "Just now",
        type: "success",
      },
      ...previous,
    ]);

    setCarbonAmount("");
    setFormMessage("Carbon transaction saved successfully!");
  };

  const handleStartChallenge = () => {
    setActivities((previous) => [
      {
        id: Date.now(),
        title: "New sustainability challenge started",
        time: "Just now",
        type: "success",
      },
      ...previous,
    ]);

    window.alert("Demo challenge started successfully!");
  };

  const handleViewReports = () => {
    window.alert(
      "Reports module is ready for integration. This dashboard is currently using demo data."
    );
  };

  const handleExport = () => {
    const rows = [
      ["Department", "ESG Score"],
      ...departments.map((item) => [item.name, item.score]),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ecos-phere-esg-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-overview">
      <style>{`
        .admin-overview {
          --admin-bg: #f4f7f5;
          --admin-card: #ffffff;
          --admin-text: #173c2b;
          --admin-muted: #64796e;
          --admin-border: #dce7e0;
          --admin-green: #16834e;
          --admin-green-light: #e8f5ed;
          width: 100%;
          min-height: 100%;
          padding: 32px;
          color: var(--admin-text);
          background: var(--admin-bg);
          box-sizing: border-box;
          font-family: inherit;
        }

        .admin-overview * {
          box-sizing: border-box;
        }

        .admin-overview h1,
        .admin-overview h2,
        .admin-overview h3,
        .admin-overview p {
          margin-top: 0;
        }

        .admin-overview .admin-page-heading {
          margin-bottom: 28px;
        }

        .admin-overview .admin-eyebrow {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 12px;
          color: var(--admin-green);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .admin-overview .admin-eyebrow-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #20a464;
        }

        .admin-overview .admin-page-heading h1 {
          margin-bottom: 8px;
          color: var(--admin-text);
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .admin-overview .admin-page-heading p {
          margin-bottom: 0;
          color: var(--admin-muted);
          font-size: 14px;
          line-height: 1.6;
        }

        .admin-overview .admin-score-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 30px;
        }

        .admin-overview .admin-score-card {
          min-width: 0;
          padding: 22px;
          background: var(--admin-card);
          border: 1px solid var(--admin-border);
          border-top: 4px solid var(--score-color);
          border-radius: 15px;
          box-shadow: 0 3px 12px rgba(20, 50, 35, 0.04);
        }

        .admin-overview .admin-score-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          color: var(--admin-muted);
          font-size: 14px;
          font-weight: 500;
        }

        .admin-overview .admin-score-heading svg {
          color: var(--score-color);
          flex-shrink: 0;
        }

        .admin-overview .admin-score-value {
          display: flex;
          align-items: baseline;
          gap: 7px;
          margin: 20px 0 15px;
        }

        .admin-overview .admin-score-value strong {
          color: var(--score-color);
          font-size: 36px;
          line-height: 1;
          font-weight: 750;
        }

        .admin-overview .admin-score-value span {
          color: var(--admin-muted);
          font-size: 13px;
        }

        .admin-overview .admin-score-track {
          width: 100%;
          height: 6px;
          overflow: hidden;
          background: var(--admin-border);
          border-radius: 20px;
        }

        .admin-overview .admin-score-fill {
          height: 100%;
          background: var(--score-color);
          border-radius: inherit;
        }

        .admin-overview .admin-feature-note {
          margin: -12px 0 22px;
          color: var(--admin-muted);
          font-size: 13px;
        }

        .admin-overview .admin-panel-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          align-items: stretch;
        }

        .admin-overview .admin-panel {
          min-width: 0;
          padding: 24px;
          background: var(--admin-card);
          border: 1px solid var(--admin-border);
          border-radius: 18px;
          box-shadow: 0 3px 12px rgba(20, 50, 35, 0.04);
        }

        .admin-overview .admin-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 24px;
        }

        .admin-overview .admin-panel-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          color: var(--admin-text);
          font-size: 18px;
          font-weight: 700;
        }

        .admin-overview .admin-panel-title svg {
          color: #668b78;
          flex-shrink: 0;
        }

        .admin-overview .admin-chart-area {
          width: 100%;
          padding-top: 6px;
        }

        .admin-overview .admin-line-chart {
          display: block;
          width: 100%;
          height: 230px;
          overflow: visible;
        }

        .admin-overview .admin-chart-labels {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 2px;
          margin-top: 8px;
          color: var(--admin-muted);
          font-size: 11px;
          text-align: center;
        }

        .admin-overview .admin-bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 14px;
          height: 290px;
          padding: 15px 4px 0;
          border-bottom: 1px solid var(--admin-border);
        }

        .admin-overview .admin-bar-column {
          display: flex;
          flex: 1;
          min-width: 0;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
        }

        .admin-overview .admin-bar-value {
          color: var(--admin-muted);
          font-size: 12px;
          font-weight: 600;
        }

        .admin-overview .admin-bar-track {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: min(100%, 72px);
          height: 210px;
        }

        .admin-overview .admin-bar-fill {
          width: 100%;
          min-height: 8px;
          background: #83b8ed;
          border: 1px solid #5a9be0;
          border-radius: 7px 7px 2px 2px;
          transition: height 0.3s ease;
        }

        .admin-overview .admin-bar-label {
          min-height: 28px;
          color: var(--admin-muted);
          font-size: 12px;
          text-align: center;
        }

        .admin-overview .admin-activity-list {
          display: flex;
          flex-direction: column;
        }

        .admin-overview .admin-activity-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 17px 0;
          border-bottom: 1px solid var(--admin-border);
        }

        .admin-overview .admin-activity-item:first-child {
          padding-top: 0;
        }

        .admin-overview .admin-activity-item:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }

        .admin-overview .admin-activity-icon {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: var(--admin-bg);
        }

        .admin-overview .activity-success {
          color: #16834e;
        }

        .admin-overview .activity-warning {
          color: #d97706;
        }

        .admin-overview .activity-info {
          color: #397bd1;
        }

        .admin-overview .admin-activity-copy {
          min-width: 0;
        }

        .admin-overview .admin-activity-copy p {
          margin: 3px 0 5px;
          color: var(--admin-text);
          font-size: 14px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .admin-overview .admin-activity-copy time {
          color: var(--admin-muted);
          font-size: 12px;
        }

        .admin-overview .admin-text-button {
          padding: 5px 0;
          color: var(--admin-green);
          background: transparent;
          border: 0;
          font: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .admin-overview .admin-text-button:hover {
          text-decoration: underline;
        }

        .admin-overview .admin-quick-buttons {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 24px;
        }

        .admin-overview .admin-action-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 220px;
          min-height: 46px;
          padding: 11px 18px;
          border: 1px solid transparent;
          border-radius: 10px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: filter 0.2s ease, transform 0.2s ease;
        }

        .admin-overview .admin-action-button:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        .admin-overview .admin-action-primary {
          background: #168f50;
        }

        .admin-overview .admin-action-secondary {
          background: #e65b0b;
        }

        .admin-overview .admin-action-tertiary {
          background: #475569;
        }

        .admin-overview .admin-transaction-form {
          padding: 20px;
          background: #f7faf8;
          border: 1px solid var(--admin-border);
          border-radius: 14px;
        }

        .admin-overview .admin-transaction-form h3 {
          margin-bottom: 18px;
          color: #173c2b;
          font-size: 16px;
          font-weight: 700;
        }

        .admin-overview .admin-form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .admin-overview .admin-form-field label {
          color: #526b5e;
          font-size: 13px;
          font-weight: 600;
        }

        .admin-overview .admin-form-field input,
        .admin-overview .admin-form-field select {
          width: 100%;
          min-height: 48px;
          padding: 12px 14px;
          color: #173c2b;
          background: #ffffff;
          border: 1px solid #cbd9d0;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          outline: none;
        }

        .admin-overview .admin-form-field input::placeholder {
          color: #8a9b91;
        }

        .admin-overview .admin-form-field input:focus,
        .admin-overview .admin-form-field select:focus {
          border-color: #168f50;
          box-shadow: 0 0 0 3px rgba(22, 143, 80, 0.12);
        }

        .admin-overview .admin-save-button {
          width: 100%;
          min-height: 48px;
          padding: 12px 16px;
          color: #ffffff;
          background: #16834e;
          border: 0;
          border-radius: 9px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .admin-overview .admin-save-button:hover {
          background: #116c40;
        }

        .admin-overview .admin-form-message {
          margin: 12px 0 0;
          color: #16834e;
          font-size: 13px;
          line-height: 1.5;
        }

        .admin-overview .admin-transaction-count {
          margin-top: 16px;
          padding: 12px 14px;
          color: var(--admin-muted);
          background: var(--admin-bg);
          border-radius: 9px;
          font-size: 13px;
        }

        .admin-overview .admin-transaction-count strong {
          color: var(--admin-text);
        }

        @media (max-width: 1100px) {
          .admin-overview .admin-score-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .admin-overview {
            padding: 20px 16px;
          }

          .admin-overview .admin-panel-grid {
            grid-template-columns: 1fr;
          }

          .admin-overview .admin-panel {
            padding: 18px;
          }

          .admin-overview .admin-bar-chart {
            gap: 7px;
          }

          .admin-overview .admin-bar-label {
            font-size: 10px;
          }
        }

        @media (max-width: 480px) {
          .admin-overview .admin-score-grid {
            grid-template-columns: 1fr;
          }

          .admin-overview .admin-score-card {
            padding: 18px;
          }

          .admin-overview .admin-panel-title {
            font-size: 16px;
          }

          .admin-overview .admin-chart-labels {
            font-size: 9px;
          }

          .admin-overview .admin-action-button {
            width: 100%;
          }

          .admin-overview .admin-transaction-form {
            padding: 16px;
          }
        }

        /* Dark mode support */
        [data-theme="dark"] .admin-overview,
        .dark .admin-overview {
          --admin-bg: #0d1b16;
          --admin-card: #14251e;
          --admin-text: #e7f1eb;
          --admin-muted: #a0b5a9;
          --admin-border: #2a4437;
          --admin-green: #42c982;
          --admin-green-light: #1b382a;
        }

        [data-theme="dark"] .admin-overview .admin-transaction-form,
        .dark .admin-overview .admin-transaction-form {
          background: #1b3027;
          border-color: #355343;
        }

        [data-theme="dark"] .admin-overview .admin-transaction-form h3,
        .dark .admin-overview .admin-transaction-form h3 {
          color: #e7f1eb;
        }

        [data-theme="dark"] .admin-overview .admin-form-field label,
        .dark .admin-overview .admin-form-field label {
          color: #b6c9bd;
        }

        [data-theme="dark"] .admin-overview .admin-form-field input,
        [data-theme="dark"] .admin-overview .admin-form-field select,
        .dark .admin-overview .admin-form-field input,
        .dark .admin-overview .admin-form-field select {
          color: #e7f1eb;
          background: #12221b;
          border-color: #3b5848;
        }

        [data-theme="dark"] .admin-overview .admin-form-field input::placeholder,
        .dark .admin-overview .admin-form-field input::placeholder {
          color: #829b8d;
        }
      `}</style>

      <header className="admin-page-heading">
        <div className="admin-eyebrow">
          <span className="admin-eyebrow-dot" />
          Admin Dashboard
        </div>

        <h1>Executive Overview</h1>

        <p>
          Monitor your organization's ESG performance at a glance.
        </p>
      </header>

      <section className="admin-score-grid">
        <ScoreCard
          title="Environmental Score"
          score={82}
          color="#16a34a"
          icon={Leaf}
        />

        <ScoreCard
          title="Social Score"
          score={74}
          color="#2563eb"
          icon={Heart}
        />

        <ScoreCard
          title="Governance Score"
          score={88}
          color="#7c3aed"
          icon={ShieldCheck}
        />

        <ScoreCard
          title="Overall ESG Score"
          score={81}
          color="#0d9488"
          icon={TrendingUp}
        />
      </section>

      <p className="admin-feature-note">
        Features: live KPI tiles · trend indicators · click-through modules
      </p>

      <section className="admin-panel-grid">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">
              <TrendingUp size={19} />
              Emissions Trend (12 mo)
            </h2>
          </div>

          <EmissionsChart />
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">
              <BarChart3 size={19} />
              Department ESG Ranking
            </h2>
          </div>

          <DepartmentChart />
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">
              <ClipboardList size={19} />
              Recent Activity
            </h2>

            <button
              type="button"
              className="admin-text-button"
              onClick={() =>
                window.alert("All recent activities are shown in this demo.")
              }
            >
              View all
            </button>
          </div>

          <div className="admin-activity-list">
            {activities.slice(0, 6).map((activity) => (
              <div className="admin-activity-item" key={activity.id}>
                <div className="admin-activity-icon">
                  <ActivityIcon type={activity.type} />
                </div>

                <div className="admin-activity-copy">
                  <p>{activity.title}</p>
                  <time>{activity.time}</time>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">
              <Zap size={19} />
              Quick Actions
            </h2>
          </div>

          <div className="admin-quick-buttons">
            <button
              type="button"
              className="admin-action-button admin-action-primary"
              onClick={() => {
                setShowTransactionForm((previous) => !previous);
                setFormMessage("");
              }}
            >
              <Plus size={18} />
              Log Carbon Data
            </button>

            <button
              type="button"
              className="admin-action-button admin-action-secondary"
              onClick={handleStartChallenge}
            >
              <Zap size={18} />
              Start Challenge
            </button>

            <button
              type="button"
              className="admin-action-button admin-action-tertiary"
              onClick={handleViewReports}
            >
              <FileText size={18} />
              View Reports
              <Download size={15} />
            </button>
          </div>

          {showTransactionForm && (
            <form
              className="admin-transaction-form"
              onSubmit={handleSaveTransaction}
            >
              <h3>Add Carbon Transaction</h3>

              <div className="admin-form-field">
                <label htmlFor="carbon-department">Department</label>

                <select
                  id="carbon-department"
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                >
                  <option>Engineering</option>
                  <option>Human Resources</option>
                  <option>Operations</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                  <option>Logistics</option>
                  <option>R&D</option>
                </select>
              </div>

              <div className="admin-form-field">
                <label htmlFor="carbon-amount">
                  Carbon amount (tonnes)
                </label>

                <input
                  id="carbon-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="e.g. 12.5"
                  value={carbonAmount}
                  onChange={(event) => setCarbonAmount(event.target.value)}
                  required
                />
              </div>

              <button type="submit" className="admin-save-button">
                Save Transaction
              </button>

              {formMessage && (
                <p className="admin-form-message" role="status">
                  {formMessage}
                </p>
              )}

              <div className="admin-transaction-count">
                <strong>{transactions.length}</strong>{" "}
                demo transaction{transactions.length === 1 ? "" : "s"} saved
                this session
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
