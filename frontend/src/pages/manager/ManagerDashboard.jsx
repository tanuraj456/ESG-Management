
import { useMemo, useState } from "react";
import {
  Users,
  Leaf,
  CheckCircle2,
  ClipboardList,
  Plus,
  CalendarDays,
  Clock3,
  Trophy,
  ArrowUpRight,
  Target,
  CircleCheck,
  Circle,
  Zap,
  TrendingUp,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import ESGScoreCard from "../../components/dashboard/ESGScoreCard";
import SectionHeader from "../../components/dashboard/SectionHeader";

import {
  managerStats,
  managerTasks,
  managerTeam,
  managerProgress,
  sustainabilityInitiatives,
} from "../../data/dashboardData";

const iconMap = {
  Users,
  Leaf,
  CheckCircle: CheckCircle2,
  ClipboardList,
};

const ManagerDashboard = () => {
  // Local state makes demo task updates interactive
  const [tasks, setTasks] = useState(managerTasks);

  const [taskFilter, setTaskFilter] = useState("All");

  const [showAllTeam, setShowAllTeam] = useState(false);

  const [showAllInitiatives, setShowAllInitiatives] =
    useState(false);

  // Calculate task statistics dynamically
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completionRate = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  // Update task status
  const handleTaskStatus = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "Completed"
                  ? "Pending"
                  : "Completed",
            }
          : task
      )
    );
  };

  // Filter task list
  const filteredTasks = useMemo(() => {
    if (taskFilter === "All") return tasks;

    return tasks.filter(
      (task) => task.status === taskFilter
    );
  }, [tasks, taskFilter]);

  // Dynamic KPI data
  const dynamicStats = managerStats.map((stat) => {
    if (stat.title === "Tasks Completed") {
      return {
        ...stat,
        value: String(completedTasks),
        description: "Completed in demo task list",
      };
    }

    if (stat.title === "Pending Tasks") {
      return {
        ...stat,
        value: String(pendingTasks),
        description: "Awaiting completion",
      };
    }

    return stat;
  });

  const visibleTeam = showAllTeam
    ? managerTeam
    : managerTeam.slice(0, 4);

  const visibleInitiatives = showAllInitiatives
    ? sustainabilityInitiatives
    : sustainabilityInitiatives.slice(0, 2);

  const getPriorityClass = (priority) => {
    return `priority-badge priority-${priority.toLowerCase()}`;
  };

  const getStatusClass = (status) => {
    return `task-status status-${status
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  return (
    <div className="manager-dashboard">
      {/* Welcome Section */}
      <section className="dashboard-welcome">
        <div>
          <div className="welcome-eyebrow">
            <span className="welcome-dot" />
            DEPARTMENT WORKSPACE
          </div>

          <h1>
            Welcome back, Nandani <span>✦</span>
          </h1>

          <p>
            Here's your team's sustainability progress.
            Keep inspiring your team to make an impact.
          </p>

          <div className="welcome-company">
            <Users size={16} />
            <span>Engineering Department</span>
            <span className="welcome-divider">•</span>
            <span>{managerTeam.length} demo team members</span>
          </div>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            alert("Demo: Create task feature coming soon!")
          }
        >
          <Plus size={17} />
          Create Task
        </button>
      </section>

      {/* KPI Cards */}
      <section className="manager-stats-grid">
        {dynamicStats.map((stat) => {
          const Icon = iconMap[stat.iconName] || Leaf;

          return (
            <StatCard
              key={stat.id}
              {...stat}
              icon={Icon}
            />
          );
        })}
      </section>

      {/* Main Content */}
      <section className="manager-main-grid">
        {/* Department ESG Score */}
        <ESGScoreCard
          score={89.2}
          environmental={93}
          social={87}
          governance={88}
        />

        {/* Team Progress */}
        <div className="dashboard-panel team-progress-panel">
          <div className="panel-heading">
            <div>
              <h3>Team Progress</h3>
              <p>Monthly task completion overview</p>
            </div>

            <div className="panel-icon">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="completion-summary">
            <div>
              <span className="chart-summary-label">
                Completion Rate
              </span>

              <h2>{completionRate}%</h2>

              <span className="completion-caption">
                {completedTasks} of {tasks.length} demo tasks completed
              </span>
            </div>

            <div className="completion-ring">
              <svg viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  className="completion-ring-bg"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  className="completion-ring-fill"
                  strokeDasharray={`${(completionRate / 100) * 301.6} 301.6`}
                />
              </svg>

              <div className="completion-ring-label">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </div>

          <div className="task-summary-list">
            <div className="task-summary-item">
              <span className="summary-indicator completed-indicator" />
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>

            <div className="task-summary-item">
              <span className="summary-indicator progress-indicator" />
              <span>In Progress</span>
              <strong>{inProgressTasks}</strong>
            </div>

            <div className="task-summary-item">
              <span className="summary-indicator pending-indicator" />
              <span>Pending</span>
              <strong>{pendingTasks}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Task Management */}
      <section className="dashboard-panel manager-tasks-panel">
        <SectionHeader
          title="Team Tasks"
          description="Monitor assignments and update task completion."
          actionLabel="Add Task"
          actionIcon={Plus}
          onAction={() =>
            alert("Demo: Add Task form will be added soon.")
          }
        />

        <div className="task-filter-bar">
          {["All", "Pending", "In Progress", "Completed"].map(
            (filter) => (
              <button
                key={filter}
                className={`task-filter ${
                  taskFilter === filter ? "filter-active" : ""
                }`}
                onClick={() => setTaskFilter(filter)}
              >
                {filter}
                {filter === "All" && (
                  <span>{tasks.length}</span>
                )}
              </button>
            )
          )}
        </div>

        <div className="manager-task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <ClipboardList size={28} />
              <strong>No tasks found</strong>
              <p>Try selecting another filter.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div className="manager-task-item" key={task.id}>
                <button
                  className={`task-check ${
                    task.status === "Completed"
                      ? "task-checked"
                      : ""
                  }`}
                  onClick={() => handleTaskStatus(task.id)}
                  title={
                    task.status === "Completed"
                      ? "Mark as pending"
                      : "Mark as completed"
                  }
                  aria-label={`Toggle task ${task.title}`}
                >
                  {task.status === "Completed" ? (
                    <CircleCheck size={21} />
                  ) : (
                    <Circle size={21} />
                  )}
                </button>

                <div className="manager-task-content">
                  <strong
                    className={
                      task.status === "Completed"
                        ? "task-title-completed"
                        : ""
                    }
                  >
                    {task.title}
                  </strong>

                  <div className="manager-task-meta">
                    <span>{task.category}</span>
                    <span className="task-meta-separator">•</span>
                    <span>{task.assignee}</span>
                    <span className="task-meta-separator">•</span>
                    <span>
                      <CalendarDays size={13} />
                      {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="manager-task-actions">
                  <span className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </span>

                  <span className={getStatusClass(task.status)}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Bottom Grid */}
      <section className="manager-bottom-grid">
        {/* Team Members */}
        <div className="dashboard-panel manager-team-panel">
          <SectionHeader
            title="Team Members"
            description="Your team's engagement and contribution."
            actionLabel={showAllTeam ? "Show Less" : "View All"}
            onAction={() => setShowAllTeam(!showAllTeam)}
          />

          <div className="manager-team-list">
            {visibleTeam.map((member, index) => (
              <div className="manager-member-item" key={member.id}>
                <div className="member-rank">
                  {index + 1}
                </div>

                <div className="member-avatar">
                  {member.initials}
                </div>

                <div className="member-details">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>

                <div className="member-performance">
                  <div>
                    <Trophy size={15} />
                    <strong>{member.points.toLocaleString()}</strong>
                  </div>

                  <span>{member.tasksCompleted} tasks</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Initiatives */}
        <div className="dashboard-panel manager-initiatives-panel">
          <SectionHeader
            title="Department Initiatives"
            description="Track sustainability goals."
            actionLabel={
              showAllInitiatives ? "Show Less" : "View All"
            }
            onAction={() =>
              setShowAllInitiatives(!showAllInitiatives)
            }
          />

          <div className="initiative-list">
            {visibleInitiatives.map((initiative) => (
              <div
                className="initiative-item"
                key={initiative.id}
              >
                <div className="initiative-top">
                  <div className="initiative-icon">
                    <Leaf size={18} />
                  </div>

                  <div className="initiative-info">
                    <strong>{initiative.title}</strong>
                    <span>{initiative.category}</span>
                  </div>

                  <span className="initiative-percentage">
                    {initiative.progress}%
                  </span>
                </div>

                <div className="initiative-progress-track">
                  <div
                    className="initiative-progress-fill"
                    style={{
                      width: `${initiative.progress}%`,
                    }}
                  />
                </div>

                <div className="initiative-footer">
                  <span>{initiative.status}</span>
                  <span>
                    <Target size={13} />
                    Goal tracking
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <span>© 2026 EcoSphere ESG Management Platform</span>

        <span>
          Empowering teams for a greener future.
          <Leaf size={14} />
        </span>
      </footer>
    </div>
  );
};

export default ManagerDashboard;
