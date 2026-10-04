
import { useMemo, useState } from "react";

const departments = [
  {
    id: 1,
    name: "Engineering",
    code: "ENG",
    head: "Aarav Sharma",
    employees: 85,
    esgScore: 92,
    emissions: 1250,
    energy: 8400,
    waste: 78,
    target: 95,
    status: "Excellent",
  },
  {
    id: 2,
    name: "Human Resources",
    code: "HR",
    head: "Priya Mehta",
    employees: 32,
    esgScore: 89,
    emissions: 420,
    energy: 3100,
    waste: 92,
    target: 90,
    status: "On Track",
  },
  {
    id: 3,
    name: "Operations",
    code: "OPS",
    head: "Rohan Verma",
    employees: 64,
    esgScore: 84,
    emissions: 2100,
    energy: 12600,
    waste: 68,
    target: 90,
    status: "Needs Attention",
  },
  {
    id: 4,
    name: "Finance",
    code: "FIN",
    head: "Ananya Singh",
    employees: 28,
    esgScore: 94,
    emissions: 380,
    energy: 2600,
    waste: 95,
    target: 92,
    status: "Excellent",
  },
  {
    id: 5,
    name: "Marketing",
    code: "MKT",
    head: "Kabir Joshi",
    employees: 41,
    esgScore: 87,
    emissions: 610,
    energy: 4200,
    waste: 82,
    target: 90,
    status: "On Track",
  },
  {
    id: 6,
    name: "Procurement",
    code: "PRC",
    head: "Meera Kapoor",
    employees: 36,
    esgScore: 78,
    emissions: 980,
    energy: 5700,
    waste: 61,
    target: 88,
    status: "Needs Attention",
  },
];

const departmentGoals = [
  {
    department: "Engineering",
    goal: "Reduce carbon emissions",
    current: 78,
    target: 90,
    color: "green",
  },
  {
    department: "Human Resources",
    goal: "Employee wellness participation",
    current: 86,
    target: 95,
    color: "purple",
  },
  {
    department: "Operations",
    goal: "Energy efficiency improvement",
    current: 65,
    target: 85,
    color: "blue",
  },
  {
    department: "Finance",
    goal: "Paperless documentation",
    current: 92,
    target: 95,
    color: "orange",
  },
];

function DepartmentStatus({ status }) {
  const className = status.toLowerCase().replaceAll(" ", "-");

  return (
    <span className={`department-status ${className}`}>
      {status}
    </span>
  );
}

function Departments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const totalEmployees = departments.reduce(
    (sum, department) => sum + department.employees,
    0
  );

  const averageScore = Math.round(
    departments.reduce(
      (sum, department) => sum + department.esgScore,
      0
    ) / departments.length
  );

  const departmentsOnTarget = departments.filter(
    (department) =>
      department.esgScore >= department.target
  ).length;

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const matchesSearch =
        department.name.toLowerCase().includes(search.toLowerCase()) ||
        department.head.toLowerCase().includes(search.toLowerCase()) ||
        department.code.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        department.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const exportCSV = () => {
    const rows = [
      [
        "Department",
        "Code",
        "Department Head",
        "Employees",
        "ESG Score",
        "Carbon Emissions",
        "Energy Consumption",
        "Waste Recycled",
        "Target",
        "Status",
      ],
      ...filteredDepartments.map((department) => [
        department.name,
        department.code,
        department.head,
        department.employees,
        `${department.esgScore}%`,
        department.emissions,
        department.energy,
        `${department.waste}%`,
        `${department.target}%`,
        department.status,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecospher-departments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="departments-page">
      {/* HEADER */}

      <div className="departments-header">
        <div>
          <div className="departments-breadcrumb">
            Admin <span>/</span> Departments
          </div>

          <h1>Department Management</h1>

          <p>
            Monitor department-level ESG performance, sustainability goals,
            and organizational contributions.
          </p>
        </div>

        <button
          className="departments-export-btn"
          onClick={exportCSV}
        >
          ↓ Export Report
        </button>
      </div>

      {/* KPI CARDS */}

      <div className="departments-kpi-grid">
        <div className="departments-kpi-card">
          <div className="departments-kpi-top">
            <span className="departments-kpi-icon total">▦</span>
            <span className="departments-kpi-trend">Active</span>
          </div>
          <p>Total Departments</p>
          <h2>{departments.length}</h2>
          <small>Across the organization</small>
        </div>

        <div className="departments-kpi-card">
          <div className="departments-kpi-top">
            <span className="departments-kpi-icon employees">♙</span>
            <span className="departments-kpi-trend">Workforce</span>
          </div>
          <p>Total Employees</p>
          <h2>{totalEmployees}</h2>
          <small>Distributed across departments</small>
        </div>

        <div className="departments-kpi-card">
          <div className="departments-kpi-top">
            <span className="departments-kpi-icon score">◈</span>
            <span className="departments-kpi-trend">↗ 3.6%</span>
          </div>
          <p>Average ESG Score</p>
          <h2>{averageScore}<span>%</span></h2>
          <small>Organization-wide performance</small>
        </div>

        <div className="departments-kpi-card">
          <div className="departments-kpi-top">
            <span className="departments-kpi-icon target">✓</span>
            <span className="departments-kpi-trend">On Target</span>
          </div>
          <p>Departments Meeting Goals</p>
          <h2>{departmentsOnTarget}<span>/{departments.length}</span></h2>
          <small>Meeting their ESG score targets</small>
        </div>
      </div>

      {/* DEPARTMENT DIRECTORY */}

      <section className="departments-panel">
        <div className="departments-panel-header">
          <div>
            <h2>Department Directory</h2>
            <p>
              View department details and sustainability performance.
            </p>
          </div>
          <span className="departments-panel-badge">
            {filteredDepartments.length} departments
          </span>
        </div>

        <div className="departments-toolbar">
          <div className="departments-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search department or head..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="departments-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter departments by status"
          >
            <option>All</option>
            <option>Excellent</option>
            <option>On Track</option>
            <option>Needs Attention</option>
          </select>
        </div>

        <div className="departments-table-wrapper">
          <table className="departments-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Department Head</th>
                <th>Employees</th>
                <th>ESG Score</th>
                <th>Target</th>
                <th>Performance</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map((department) => (
                <tr key={department.id}>
                  <td>
                    <div className="department-name-cell">
                      <span className="department-avatar">
                        {department.code.slice(0, 2)}
                      </span>
                      <div>
                        <strong>{department.name}</strong>
                        <small>{department.code}</small>
                      </div>
                    </div>
                  </td>

                  <td>{department.head}</td>
                  <td>{department.employees}</td>

                  <td>
                    <div className="department-score-cell">
                      <strong>{department.esgScore}%</strong>
                      <div className="department-mini-track">
                        <div
                          style={{
                            width: `${department.esgScore}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>{department.target}%</td>

                  <td>
                    <DepartmentStatus status={department.status} />
                  </td>

                  <td>
                    <button
                      className="department-view-btn"
                      onClick={() =>
                        setSelectedDepartment(department)
                      }
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDepartments.length === 0 && (
                <tr>
                  <td colSpan="7" className="departments-empty">
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ENVIRONMENTAL PERFORMANCE */}

      <section className="departments-panel">
        <div className="departments-panel-header">
          <div>
            <h2>Environmental Performance</h2>
            <p>
              Compare carbon emissions across departments.
            </p>
          </div>
          <span className="departments-panel-badge">
            CO₂ emissions
          </span>
        </div>

        <div className="department-emissions-chart">
          {departments.map((department) => {
            const maxEmission = Math.max(
              ...departments.map((item) => item.emissions)
            );

            const width =
              (department.emissions / maxEmission) * 100;

            return (
              <div
                className="department-emission-row"
                key={department.id}
              >
                <div className="department-emission-label">
                  <span>{department.name}</span>
                  <strong>
                    {department.emissions.toLocaleString()} kg
                  </strong>
                </div>

                <div className="department-emission-track">
                  <div
                    className="department-emission-fill"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="department-chart-note">
          <span>ⓘ</span>
          Operations has the highest recorded emissions and may benefit
          from additional efficiency initiatives.
        </div>
      </section>

      {/* DEPARTMENT GOALS */}

      <section className="departments-panel">
        <div className="departments-panel-header">
          <div>
            <h2>Department Sustainability Goals</h2>
            <p>
              Track progress toward department-level sustainability targets.
            </p>
          </div>
          <span className="departments-panel-badge">
            2026 targets
          </span>
        </div>

        <div className="department-goals-grid">
          {departmentGoals.map((goal) => {
            const progress = Math.min(
              (goal.current / goal.target) * 100,
              100
            );

            return (
              <div
                className="department-goal-card"
                key={goal.department}
              >
                <div className="department-goal-top">
                  <span>{goal.department}</span>
                  <strong>{Math.round(progress)}%</strong>
                </div>

                <h3>{goal.goal}</h3>

                <div className="department-goal-track">
                  <div
                    className={`department-goal-fill ${goal.color}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="department-goal-values">
                  <span>Current: {goal.current}%</span>
                  <span>Target: {goal.target}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEPARTMENT DETAILS MODAL */}

      {selectedDepartment && (
        <div
          className="department-modal-overlay"
          onClick={() => setSelectedDepartment(null)}
        >
          <div
            className="department-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="department-modal-header">
              <div>
                <span className="department-modal-eyebrow">
                  Department Overview
                </span>
                <h2>{selectedDepartment.name}</h2>
              </div>

              <button
                className="department-modal-close"
                onClick={() => setSelectedDepartment(null)}
                aria-label="Close department details"
              >
                ×
              </button>
            </div>

            <div className="department-modal-score">
              <span>ESG Performance Score</span>
              <strong>{selectedDepartment.esgScore}%</strong>
              <DepartmentStatus
                status={selectedDepartment.status}
              />
            </div>

            <div className="department-modal-grid">
              <div>
                <span>Department Head</span>
                <strong>{selectedDepartment.head}</strong>
              </div>

              <div>
                <span>Employees</span>
                <strong>{selectedDepartment.employees}</strong>
              </div>

              <div>
                <span>Carbon Emissions</span>
                <strong>
                  {selectedDepartment.emissions.toLocaleString()} kg
                </strong>
              </div>

              <div>
                <span>Energy Consumption</span>
                <strong>
                  {selectedDepartment.energy.toLocaleString()} kWh
                </strong>
              </div>

              <div>
                <span>Waste Recycled</span>
                <strong>{selectedDepartment.waste}%</strong>
              </div>

              <div>
                <span>ESG Target</span>
                <strong>{selectedDepartment.target}%</strong>
              </div>
            </div>

            <button
              className="department-modal-done"
              onClick={() => setSelectedDepartment(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Departments;
