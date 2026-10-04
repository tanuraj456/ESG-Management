import React from "react";
import { Building2, TrendingUp, TrendingDown } from "lucide-react";
import { departmentPerformance } from "../../data/dashboardData";

const DepartmentPerformance = () => {
  const getPerformanceLabel = (score) => {
    if (score >= 85) return "Excellent performance";
    if (score >= 75) return "Good performance";
    return "Needs improvement";
  };

  return (
    <section className="department-section">
      {/* Section Header */}
      <div className="department-section-header">
        <div>
          <h2>Department Performance</h2>
          <p>
            ESG scores and sustainability progress across departments
          </p>
        </div>

        <span className="department-live-badge">
          <span className="live-dot"></span>
          Demo Data
        </span>
      </div>

      {/* Department Cards */}
      <div className="department-grid">
        {departmentPerformance.map((department, index) => {
          const score = department.score;
          const change = department.change ?? 0;
          const isPositive = change >= 0;

          return (
            <article
              className="department-card"
              key={department.name}
            >
              {/* Card Header */}
              <div className="department-card-top">
                <div
                  className={`department-icon department-icon-${index % 5}`}
                >
                  <Building2 size={21} />
                </div>

                <span
                  className={`department-change ${
                    isPositive ? "positive" : "negative"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}

                  {Math.abs(change)}%
                </span>
              </div>

              {/* Department Details */}
              <div className="department-card-info">
                <h3>{department.name}</h3>
                <p>
                  {department.employees} employees
                </p>
              </div>

              {/* ESG Score */}
              <div className="department-score-row">
                <span>ESG Score</span>

                <strong>
                  {score}
                  <small>/100</small>
                </strong>
              </div>

              {/* Progress Bar */}
              <div
                className="department-progress-track"
                role="progressbar"
                aria-label={`${department.name} ESG score`}
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="department-progress-fill"
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Card Footer */}
              <div className="department-card-footer">
                <span>{getPerformanceLabel(score)}</span>
                <span>{score}%</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DepartmentPerformance;