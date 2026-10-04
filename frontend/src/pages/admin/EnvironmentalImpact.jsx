import { useState } from "react";
import {
  Leaf,
  Cloud,
  Zap,
  Droplets,
  Recycle,
  TrendingDown,
  TrendingUp,
  Download,
  Target,
  Wind,
  CalendarDays,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", emissions: 180, energy: 420, water: 920, waste: 68 },
  { month: "Feb", emissions: 165, energy: 390, water: 870, waste: 72 },
  { month: "Mar", emissions: 172, energy: 410, water: 890, waste: 70 },
  { month: "Apr", emissions: 158, energy: 380, water: 840, waste: 75 },
  { month: "May", emissions: 149, energy: 360, water: 810, waste: 76 },
  { month: "Jun", emissions: 142, energy: 345, water: 790, waste: 78 },
  { month: "Jul", emissions: 138, energy: 330, water: 770, waste: 80 },
  { month: "Aug", emissions: 130, energy: 315, water: 750, waste: 82 },
  { month: "Sep", emissions: 125, energy: 300, water: 730, waste: 84 },
  { month: "Oct", emissions: 119, energy: 285, water: 710, waste: 86 },
];

const environmentalGoals = [
  {
    id: 1,
    title: "Carbon Emission Reduction",
    description: "Reduce total carbon emissions by 30% by 2030",
    current: 18.6,
    target: 30,
    unit: "%",
    color: "#16a34a",
  },
  {
    id: 2,
    title: "Renewable Energy Adoption",
    description: "Transition to 80% renewable energy",
    current: 64,
    target: 80,
    unit: "%",
    color: "#0d9488",
  },
  {
    id: 3,
    title: "Water Conservation",
    description: "Reduce water consumption by 25%",
    current: 16,
    target: 25,
    unit: "%",
    color: "#0284c7",
  },
  {
    id: 4,
    title: "Waste Diversion",
    description: "Divert 90% of waste from landfills",
    current: 78,
    target: 90,
    unit: "%",
    color: "#ca8a04",
  },
];

function EnvironmentalImpact() {
  const [period, setPeriod] = useState("10");

  const visibleData = monthlyData.slice(-Number(period));

  const maxEmission = Math.max(
    ...visibleData.map((item) => item.emissions)
  );

  const maxEnergy = Math.max(
    ...visibleData.map((item) => item.energy)
  );

  const exportCSV = () => {
    const headers = [
      "Month",
      "Carbon Emissions (tCO2e)",
      "Energy Consumption (MWh)",
      "Water Consumption (kL)",
      "Waste Diversion (%)",
    ];

    const rows = visibleData.map((item) => [
      item.month,
      item.emissions,
      item.energy,
      item.water,
      item.waste,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecospher-environmental-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="environmental-page">
      {/* Page Header */}
      <div className="environmental-header">
        <div>
          <div className="environmental-breadcrumb">
            Admin Dashboard / Environmental Impact
          </div>

          <h1>Environmental Impact</h1>

          <p>
            Monitor your organization's environmental performance,
            sustainability metrics, and progress toward green goals.
          </p>
        </div>

        <div className="environmental-header-actions">
          <div className="period-selector">
            <CalendarDays size={16} />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              aria-label="Select reporting period"
            >
              <option value="3">Last 3 months</option>
              <option value="6">Last 6 months</option>
              <option value="10">Last 10 months</option>
            </select>
          </div>

          <button
            className="environmental-export-btn"
            onClick={exportCSV}
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="environmental-kpi-grid">
        <div className="environmental-kpi-card">
          <div className="environmental-kpi-top">
            <div className="environmental-kpi-icon carbon">
              <Cloud size={21} />
            </div>

            <span className="environmental-trend positive">
              <TrendingDown size={15} />
              18.6%
            </span>
          </div>

          <p className="environmental-kpi-label">
            Total Carbon Emissions
          </p>

          <h2>1,248 <span>tCO₂e</span></h2>

          <p className="environmental-kpi-footnote">
            ↓ 18.6% compared to last year
          </p>
        </div>

        <div className="environmental-kpi-card">
          <div className="environmental-kpi-top">
            <div className="environmental-kpi-icon energy">
              <Zap size={21} />
            </div>

            <span className="environmental-trend positive">
              <TrendingDown size={15} />
              12.4%
            </span>
          </div>

          <p className="environmental-kpi-label">
            Energy Consumption
          </p>

          <h2>3,840 <span>MWh</span></h2>

          <p className="environmental-kpi-footnote">
            ↓ 12.4% compared to last year
          </p>
        </div>

        <div className="environmental-kpi-card">
          <div className="environmental-kpi-top">
            <div className="environmental-kpi-icon water">
              <Droplets size={21} />
            </div>

            <span className="environmental-trend positive">
              <TrendingDown size={15} />
              8.2%
            </span>
          </div>

          <p className="environmental-kpi-label">
            Water Consumption
          </p>

          <h2>8,420 <span>kL</span></h2>

          <p className="environmental-kpi-footnote">
            ↓ 8.2% compared to last year
          </p>
        </div>

        <div className="environmental-kpi-card">
          <div className="environmental-kpi-top">
            <div className="environmental-kpi-icon waste">
              <Recycle size={21} />
            </div>

            <span className="environmental-trend positive">
              <TrendingUp size={15} />
              6.5%
            </span>
          </div>

          <p className="environmental-kpi-label">
            Waste Diversion Rate
          </p>

          <h2>78<span>%</span></h2>

          <p className="environmental-kpi-footnote">
            ↑ 6.5% improvement this year
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="environmental-charts-grid">
        {/* Carbon Emissions Chart */}
        <div className="environmental-panel">
          <div className="environmental-panel-header">
            <div>
              <h3>Carbon Emissions Trend</h3>
              <p>Monthly carbon footprint (tCO₂e)</p>
            </div>

            <div className="environmental-chart-icon carbon">
              <Cloud size={19} />
            </div>
          </div>

          <div className="environmental-bar-chart">
            {visibleData.map((item) => (
              <div className="environmental-bar-column" key={item.month}>
                <span className="environmental-bar-value">
                  {item.emissions}
                </span>

                <div className="environmental-bar-track">
                  <div
                    className="environmental-bar carbon-bar"
                    style={{
                      height: `${(item.emissions / maxEmission) * 100}%`,
                    }}
                  />
                </div>

                <span className="environmental-bar-label">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="environmental-chart-footer">
            <span>
              <span className="environmental-legend-dot carbon-dot" />
              Carbon emissions
            </span>

            <span className="environmental-chart-insight">
              <TrendingDown size={15} />
              Overall downward trend
            </span>
          </div>
        </div>

        {/* Energy Chart */}
        <div className="environmental-panel">
          <div className="environmental-panel-header">
            <div>
              <h3>Energy Consumption</h3>
              <p>Monthly energy usage (MWh)</p>
            </div>

            <div className="environmental-chart-icon energy">
              <Zap size={19} />
            </div>
          </div>

          <div className="environmental-bar-chart">
            {visibleData.map((item) => (
              <div className="environmental-bar-column" key={item.month}>
                <span className="environmental-bar-value">
                  {item.energy}
                </span>

                <div className="environmental-bar-track">
                  <div
                    className="environmental-bar energy-bar"
                    style={{
                      height: `${(item.energy / maxEnergy) * 100}%`,
                    }}
                  />
                </div>

                <span className="environmental-bar-label">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="environmental-chart-footer">
            <span>
              <span className="environmental-legend-dot energy-dot" />
              Energy consumption
            </span>

            <span className="environmental-chart-insight">
              <TrendingDown size={15} />
              Usage is decreasing
            </span>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="environmental-panel environmental-goals-panel">
        <div className="environmental-panel-header">
          <div>
            <h3>Environmental Goals</h3>
            <p>Track progress toward sustainability targets</p>
          </div>

          <div className="environmental-chart-icon goals">
            <Target size={19} />
          </div>
        </div>

        <div className="environmental-goals-grid">
          {environmentalGoals.map((goal) => {
            const progress = Math.min(
              (goal.current / goal.target) * 100,
              100
            );

            return (
              <div className="environmental-goal-card" key={goal.id}>
                <div className="environmental-goal-heading">
                  <div>
                    <h4>{goal.title}</h4>
                    <p>{goal.description}</p>
                  </div>

                  <span className="environmental-goal-icon">
                    <Leaf size={17} />
                  </span>
                </div>

                <div className="environmental-goal-values">
                  <strong>
                    {goal.current}
                    {goal.unit}
                  </strong>

                  <span>
                    Target: {goal.target}
                    {goal.unit}
                  </span>
                </div>

                <div className="environmental-progress-track">
                  <div
                    className="environmental-progress-fill"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: goal.color,
                    }}
                  />
                </div>

                <div className="environmental-goal-footer">
                  <span>{Math.round(progress)}% of target achieved</span>

                  <span className="environmental-goal-status">
                    {progress >= 100 ? "Achieved" : "In Progress"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Information */}
      <div className="environmental-bottom-grid">
        <div className="environmental-info-card">
          <div className="environmental-info-icon">
            <Wind size={21} />
          </div>

          <div>
            <h4>Renewable Energy</h4>
            <p>
              64% of total energy consumption is currently sourced
              from renewable energy.
            </p>

            <div className="environmental-mini-progress">
              <div style={{ width: "64%" }} />
            </div>

            <span>64% adoption · 80% target</span>
          </div>
        </div>

        <div className="environmental-info-card">
          <div className="environmental-info-icon">
            <Recycle size={21} />
          </div>

          <div>
            <h4>Waste Management</h4>
            <p>
              78% of generated waste is being recycled, reused,
              or diverted from landfills.
            </p>

            <div className="environmental-mini-progress">
              <div style={{ width: "78%" }} />
            </div>

            <span>78% diversion · 90% target</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnvironmentalImpact;