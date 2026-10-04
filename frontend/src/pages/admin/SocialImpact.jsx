
import { useState } from "react";

const monthlyData = [
  { month: "Jan", satisfaction: 78, engagement: 72, volunteer: 120 },
  { month: "Feb", satisfaction: 80, engagement: 75, volunteer: 145 },
  { month: "Mar", satisfaction: 79, engagement: 78, volunteer: 160 },
  { month: "Apr", satisfaction: 82, engagement: 76, volunteer: 180 },
  { month: "May", satisfaction: 84, engagement: 81, volunteer: 195 },
  { month: "Jun", satisfaction: 83, engagement: 84, volunteer: 210 },
  { month: "Jul", satisfaction: 86, engagement: 82, volunteer: 225 },
  { month: "Aug", satisfaction: 87, engagement: 86, volunteer: 240 },
  { month: "Sep", satisfaction: 89, engagement: 88, volunteer: 265 },
  { month: "Oct", satisfaction: 91, engagement: 90, volunteer: 290 },
];

const diversityData = [
  { label: "Women", value: 46, color: "#8b9cf5" },
  { label: "Men", value: 51, color: "#4d9b79" },
  { label: "Other / Undisclosed", value: 3, color: "#e5b86c" },
];

const goals = [
  {
    title: "Employee Satisfaction",
    current: 91,
    target: 95,
    unit: "%",
    color: "green",
  },
  {
    title: "Workforce Diversity",
    current: 46,
    target: 50,
    unit: "%",
    color: "purple",
  },
  {
    title: "Community Volunteering",
    current: 290,
    target: 400,
    unit: "hrs",
    color: "blue",
  },
  {
    title: "Safety Training Completion",
    current: 94,
    target: 100,
    unit: "%",
    color: "orange",
  },
];

const activities = [
  {
    icon: "🤝",
    title: "Community Clean-up Drive",
    description: "Employees participated in a local environmental clean-up.",
    date: "Oct 18, 2026",
    tag: "Community",
    status: "Completed",
  },
  {
    icon: "🧘",
    title: "Workplace Wellness Week",
    description: "Wellness sessions and mental health awareness activities.",
    date: "Oct 15, 2026",
    tag: "Well-being",
    status: "Completed",
  },
  {
    icon: "🎓",
    title: "Skills Development Workshop",
    description: "Professional development training for employees.",
    date: "Oct 12, 2026",
    tag: "Learning",
    status: "Ongoing",
  },
  {
    icon: "🦺",
    title: "Workplace Safety Assessment",
    description: "Quarterly safety review and compliance assessment.",
    date: "Oct 08, 2026",
    tag: "Safety",
    status: "Completed",
  },
];

function SocialIcon({ type }) {
  const icons = {
    satisfaction: "☺",
    diversity: "♧",
    volunteering: "♡",
    safety: "✓",
  };

  return <span className={`social-kpi-icon ${type}`}>{icons[type]}</span>;
}

function SocialKpiCard({ type, label, value, unit, change, footnote }) {
  return (
    <div className="social-kpi-card">
      <div className="social-kpi-top">
        <SocialIcon type={type} />
        <span className="social-trend positive">↗ {change}</span>
      </div>
      <div className="social-kpi-label">{label}</div>
      <div className="social-kpi-value">
        {value}
        <span>{unit}</span>
      </div>
      <div className="social-kpi-footnote">{footnote}</div>
    </div>
  );
}

function SocialImpact() {
  const [period, setPeriod] = useState("This Year");

  const exportCSV = () => {
    const rows = [
      ["Month", "Employee Satisfaction", "Engagement", "Volunteer Hours"],
      ...monthlyData.map((item) => [
        item.month,
        item.satisfaction,
        item.engagement,
        item.volunteer,
      ]),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecospher-social-impact.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="social-page">
      <div className="social-header">
        <div>
          <div className="social-breadcrumb">
            Admin <span>/</span> Social Impact
          </div>
          <h1>Social Impact</h1>
          <p>
            Monitor employee well-being, diversity, community engagement, and
            workplace safety.
          </p>
        </div>

        <div className="social-header-actions">
          <select
            className="social-period-selector"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            aria-label="Select reporting period"
          >
            <option>This Year</option>
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
          </select>

          <button className="social-export-btn" onClick={exportCSV}>
            ↓ Export Report
          </button>
        </div>
      </div>

      <div className="social-kpi-grid">
        <SocialKpiCard
          type="satisfaction"
          label="Employee Satisfaction"
          value="91"
          unit="%"
          change="5.2%"
          footnote="Based on latest employee survey"
        />
        <SocialKpiCard
          type="diversity"
          label="Workforce Diversity"
          value="46"
          unit="%"
          change="3.8%"
          footnote="Women representation"
        />
        <SocialKpiCard
          type="volunteering"
          label="Volunteer Hours"
          value="2,140"
          unit=" hrs"
          change="12.4%"
          footnote="Community contribution this year"
        />
        <SocialKpiCard
          type="safety"
          label="Safety Compliance"
          value="94"
          unit="%"
          change="2.1%"
          footnote="Training completion rate"
        />
      </div>

      <div className="social-charts-grid">
        <section className="social-panel">
          <div className="social-panel-header">
            <div>
              <h2>Employee Engagement</h2>
              <p>Employee satisfaction and engagement trends</p>
            </div>
            <span className="social-panel-badge">Yearly trend</span>
          </div>

          <div className="social-chart-legend">
            <span><i className="satisfaction-dot" /> Satisfaction</span>
            <span><i className="engagement-dot" /> Engagement</span>
          </div>

          <div className="social-bar-chart">
            {monthlyData.map((item) => (
              <div className="social-bar-column" key={item.month}>
                <div className="social-bar-values">
                  <div
                    className="social-bar satisfaction-bar"
                    style={{ height: `${item.satisfaction}%` }}
                    title={`Satisfaction: ${item.satisfaction}%`}
                  />
                  <div
                    className="social-bar engagement-bar"
                    style={{ height: `${item.engagement}%` }}
                    title={`Engagement: ${item.engagement}%`}
                  />
                </div>
                <span className="social-bar-label">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="social-chart-insight">
            <span>↗</span>
            Employee satisfaction has improved steadily, reaching 91% in
            October.
          </div>
        </section>

        <section className="social-panel">
          <div className="social-panel-header">
            <div>
              <h2>Workforce Diversity</h2>
              <p>Employee representation breakdown</p>
            </div>
            <span className="social-panel-badge">Current</span>
          </div>

          <div className="social-diversity-content">
            <div className="social-donut-wrap">
              <div className="social-donut">
                <div className="social-donut-center">
                  <strong>46%</strong>
                  <span>Women</span>
                </div>
              </div>
            </div>

            <div className="social-diversity-legend">
              {diversityData.map((item) => (
                <div className="social-diversity-item" key={item.label}>
                  <span
                    className="social-diversity-dot"
                    style={{ background: item.color }}
                  />
                  <span className="social-diversity-label">{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="social-chart-insight">
            <span>↗</span>
            Women represent 46% of the workforce, approaching the 50% target.
          </div>
        </section>
      </div>

      <section className="social-panel social-goals-panel">
        <div className="social-panel-header">
          <div>
            <h2>Social Sustainability Goals</h2>
            <p>Progress against organizational social impact targets</p>
          </div>
          <span className="social-panel-badge">2026 targets</span>
        </div>

        <div className="social-goals-grid">
          {goals.map((goal) => {
            const progress = Math.min(
              (goal.current / goal.target) * 100,
              100
            );

            return (
              <div className="social-goal-card" key={goal.title}>
                <div className="social-goal-heading">
                  <span>{goal.title}</span>
                  <strong>{Math.round(progress)}%</strong>
                </div>

                <div className="social-progress-track">
                  <div
                    className={`social-progress-fill ${goal.color}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="social-goal-values">
                  <span>
                    {goal.current.toLocaleString()} {goal.unit}
                  </span>
                  <span>
                    Target: {goal.target.toLocaleString()} {goal.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="social-panel social-activities-panel">
        <div className="social-panel-header">
          <div>
            <h2>Recent Social Initiatives</h2>
            <p>Latest employee and community engagement activities</p>
          </div>
          <button className="social-view-all" type="button">
            View all →
          </button>
        </div>

        <div className="social-activity-list">
          {activities.map((activity, index) => (
            <div className="social-activity" key={activity.title}>
              <div className="social-activity-icon">{activity.icon}</div>

              <div className="social-activity-content">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <div className="social-activity-meta">
                  <span>{activity.date}</span>
                  <span className="social-activity-tag">{activity.tag}</span>
                </div>
              </div>

              <span
                className={`social-activity-status ${
                  activity.status === "Ongoing" ? "ongoing" : "completed"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SocialImpact;
