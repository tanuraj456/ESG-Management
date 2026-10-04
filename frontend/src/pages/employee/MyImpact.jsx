
import React, { useMemo, useState } from "react";

const contributions = [
  {
    id: 1,
    title: "Tree Plantation Drive",
    category: "Environmental",
    date: "October 18, 2026",
    points: 100,
    status: "Completed",
    icon: "🌳",
  },
  {
    id: 2,
    title: "Plastic-Free Workplace",
    category: "Environmental",
    date: "October 12, 2026",
    points: 75,
    status: "In Progress",
    icon: "♻️",
  },
  {
    id: 3,
    title: "Community Education Program",
    category: "Social",
    date: "October 10, 2026",
    points: 150,
    status: "Completed",
    icon: "📚",
  },
  {
    id: 4,
    title: "ESG Awareness Workshop",
    category: "Governance",
    date: "October 5, 2026",
    points: 60,
    status: "Completed",
    icon: "🎓",
  },
  {
    id: 5,
    title: "Energy Conservation Challenge",
    category: "Environmental",
    date: "October 2, 2026",
    points: 120,
    status: "In Progress",
    icon: "⚡",
  },
];

const goals = [
  {
    title: "Environmental Impact",
    description: "Contribute to environmental sustainability",
    current: 72,
    target: 100,
    unit: "points",
    icon: "🌱",
    color: "green",
  },
  {
    title: "Community Engagement",
    description: "Participate in social responsibility programs",
    current: 45,
    target: 60,
    unit: "points",
    icon: "🤝",
    color: "blue",
  },
  {
    title: "ESG Learning",
    description: "Complete sustainability learning activities",
    current: 4,
    target: 5,
    unit: "courses",
    icon: "📘",
    color: "purple",
  },
];

function MyImpact() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");

  const filteredContributions = useMemo(() => {
    if (selectedCategory === "All") return contributions;

    return contributions.filter(
      (item) => item.category === selectedCategory
    );
  }, [selectedCategory]);

  const completedCount = contributions.filter(
    (item) => item.status === "Completed"
  ).length;

  const earnedPoints = contributions
    .filter((item) => item.status === "Completed")
    .reduce((total, item) => total + item.points, 0);

  return (
    <div className="employee-impact-page">
      {/* Header */}
      <div className="impact-header">
        <div>
          <p className="eyebrow">EMPLOYEE WORKSPACE / MY IMPACT</p>
          <h1>My Impact</h1>
          <p className="impact-subtitle">
            Every action counts. Track your contributions to a
            more sustainable future.
          </p>
        </div>

        <div className="impact-header-icon">🌍</div>
      </div>

      {/* Summary cards */}
      <div className="impact-stats-grid">
        <div className="impact-stat-card">
          <div className="impact-stat-icon green">⭐</div>
          <div>
            <p>Total ESG Points</p>
            <h2>{earnedPoints}</h2>
            <span className="impact-stat-note">
              Points earned from completed activities
            </span>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-stat-icon blue">🌱</div>
          <div>
            <p>Activities Completed</p>
            <h2>{completedCount}</h2>
            <span className="impact-stat-note">
              Your completed contributions
            </span>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-stat-icon purple">🎯</div>
          <div>
            <p>Overall Goal Progress</p>
            <h2>76%</h2>
            <span className="impact-stat-note">
              Progress toward your annual ESG goals
            </span>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-stat-icon orange">🏆</div>
          <div>
            <p>Impact Rank</p>
            <h2>#12</h2>
            <span className="impact-stat-note">
              Among employees in your organization
            </span>
          </div>
        </div>
      </div>

      {/* Impact overview */}
      <div className="impact-section">
        <div className="impact-section-heading">
          <div>
            <h2>My ESG Contribution</h2>
            <p>Your contribution across the three ESG pillars</p>
          </div>

          <select
            value={selectedPeriod}
            onChange={(event) => setSelectedPeriod(event.target.value)}
            className="impact-period-select"
          >
            <option>This Year</option>
            <option>This Quarter</option>
            <option>This Month</option>
          </select>
        </div>

        <div className="impact-pillars-grid">
          <div className="impact-pillar-card">
            <div className="impact-pillar-heading">
              <div className="impact-pillar-icon green">🌿</div>
              <span className="impact-pillar-label">Environmental</span>
            </div>
            <h3>72 <small>/ 100</small></h3>
            <div className="impact-progress-track">
              <div
                className="impact-progress-fill green"
                style={{ width: "72%" }}
              />
            </div>
            <p>72% of your environmental goal achieved</p>
          </div>

          <div className="impact-pillar-card">
            <div className="impact-pillar-heading">
              <div className="impact-pillar-icon blue">🤝</div>
              <span className="impact-pillar-label">Social</span>
            </div>
            <h3>45 <small>/ 60</small></h3>
            <div className="impact-progress-track">
              <div
                className="impact-progress-fill blue"
                style={{ width: "75%" }}
              />
            </div>
            <p>75% of your social goal achieved</p>
          </div>

          <div className="impact-pillar-card">
            <div className="impact-pillar-heading">
              <div className="impact-pillar-icon purple">⚖️</div>
              <span className="impact-pillar-label">Governance</span>
            </div>
            <h3>4 <small>/ 5 courses</small></h3>
            <div className="impact-progress-track">
              <div
                className="impact-progress-fill purple"
                style={{ width: "80%" }}
              />
            </div>
            <p>80% of your governance learning goal achieved</p>
          </div>
        </div>
      </div>

      {/* Personal goals */}
      <div className="impact-section">
        <div className="impact-section-heading">
          <div>
            <h2>My Goals</h2>
            <p>Track your progress toward personal ESG targets</p>
          </div>
        </div>

        <div className="impact-goals-list">
          {goals.map((goal) => {
            const percentage = Math.min(
              Math.round((goal.current / goal.target) * 100),
              100
            );

            return (
              <div className="impact-goal-card" key={goal.title}>
                <div className="impact-goal-top">
                  <div className="impact-goal-info">
                    <div className={`impact-goal-icon ${goal.color}`}>
                      {goal.icon}
                    </div>
                    <div>
                      <h3>{goal.title}</h3>
                      <p>{goal.description}</p>
                    </div>
                  </div>

                  <strong>{percentage}%</strong>
                </div>

                <div className="impact-progress-track">
                  <div
                    className={`impact-progress-fill ${goal.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="impact-goal-bottom">
                  <span>
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span>
                    {goal.target - goal.current > 0
                      ? `${goal.target - goal.current} remaining`
                      : "Goal achieved"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contribution history */}
      <div className="impact-section">
        <div className="impact-section-heading">
          <div>
            <h2>Contribution History</h2>
            <p>A record of your ESG participation and achievements</p>
          </div>

          <span className="impact-record-count">
            {filteredContributions.length} records
          </span>
        </div>

        <div className="impact-filter-tabs">
          {["All", "Environmental", "Social", "Governance"].map(
            (category) => (
              <button
                key={category}
                className={
                  selectedCategory === category ? "active" : ""
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="impact-history-list">
          {filteredContributions.map((item) => (
            <div className="impact-history-item" key={item.id}>
              <div className="impact-history-icon">{item.icon}</div>

              <div className="impact-history-content">
                <h3>{item.title}</h3>
                <p>
                  {item.category} <span>•</span> {item.date}
                </p>
              </div>

              <div className="impact-history-reward">
                <strong>+{item.points}</strong>
                <span>Points</span>
              </div>

              <span
                className={`impact-history-status ${
                  item.status === "Completed"
                    ? "completed"
                    : "progress"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}

          {filteredContributions.length === 0 && (
            <div className="impact-no-records">
              No contributions found for this category.
            </div>
          )}
        </div>
      </div>

      {/* Encouragement banner */}
      <div className="impact-encouragement">
        <div className="impact-encouragement-icon">🌎</div>
        <div>
          <h3>Small actions. Meaningful impact.</h3>
          <p>
            Your participation helps build a more responsible,
            inclusive, and sustainable workplace. Keep going!
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyImpact;
