
import { useMemo, useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Circle,
  Search,
  CalendarDays,
  ArrowUpRight,
  Filter,
  Leaf,
  Users,
  ShieldCheck,
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Complete sustainability awareness training",
    description:
      "Finish the internal training module on sustainable workplace practices and energy conservation.",
    category: "Environmental",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-10-08",
    progress: 60,
  },
  {
    id: 2,
    title: "Submit monthly ESG activity report",
    description:
      "Document your ESG contributions and submit the monthly activity report for review.",
    category: "Governance",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-10-10",
    progress: 0,
  },
  {
    id: 3,
    title: "Participate in employee wellness session",
    description:
      "Attend the scheduled wellness session and share feedback with the HR team.",
    category: "Social",
    priority: "Low",
    status: "Pending",
    dueDate: "2026-10-12",
    progress: 0,
  },
  {
    id: 4,
    title: "Review energy consumption guidelines",
    description:
      "Review updated energy-saving guidelines and implement them in your daily work routine.",
    category: "Environmental",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-10-02",
    progress: 100,
  },
  {
    id: 5,
    title: "Complete workplace ethics assessment",
    description:
      "Complete the assessment covering organizational ethics and compliance policies.",
    category: "Governance",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-10-15",
    progress: 35,
  },
  {
    id: 6,
    title: "Join community volunteering drive",
    description:
      "Participate in the upcoming community volunteering activity organized by the company.",
    category: "Social",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-09-28",
    progress: 100,
  },
  {
    id: 7,
    title: "Reduce paper usage in daily operations",
    description:
      "Adopt digital documentation practices and report paper-saving improvements.",
    category: "Environmental",
    priority: "Low",
    status: "In Progress",
    dueDate: "2026-10-20",
    progress: 50,
  },
];

const categoryIcons = {
  Environmental: Leaf,
  Social: Users,
  Governance: ShieldCheck,
};

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MyTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const stats = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const pending = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    return {
      total: tasks.length,
      completed,
      inProgress,
      pending,
      completion:
        tasks.length === 0
          ? 0
          : Math.round((completed / tasks.length) * 100),
    };
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || task.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const updateTaskStatus = (id, newStatus) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              status: newStatus,
              progress: newStatus === "Completed" ? 100 : task.progress,
            }
          : task
      )
    );
  };

  const updateProgress = (id, value) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              progress: Number(value),
              status:
                Number(value) === 100
                  ? "Completed"
                  : Number(value) > 0
                    ? "In Progress"
                    : "Pending",
            }
          : task
      )
    );
  };

  return (
    <div className="dashboard-page employee-tasks-page">
      <div className="page-heading employee-tasks-heading">
        <div>
          <span className="eyebrow">EMPLOYEE WORKSPACE / TASKS</span>
          <h1>My Tasks</h1>
          <p>
            Stay organized, track your responsibilities, and make meaningful
            contributions to your organization's ESG goals.
          </p>
        </div>
      </div>

      <div className="employee-task-stats">
        <div className="employee-task-stat-card">
          <div className="employee-task-stat-icon green">
            <ClipboardList size={20} />
          </div>
          <span>Total Tasks</span>
          <strong>{stats.total}</strong>
          <small>Assigned to you</small>
        </div>

        <div className="employee-task-stat-card">
          <div className="employee-task-stat-icon success">
            <CheckCircle2 size={20} />
          </div>
          <span>Completed</span>
          <strong>{stats.completed}</strong>
          <small>Successfully finished</small>
        </div>

        <div className="employee-task-stat-card">
          <div className="employee-task-stat-icon blue">
            <Clock size={20} />
          </div>
          <span>In Progress</span>
          <strong>{stats.inProgress}</strong>
          <small>Currently working on</small>
        </div>

        <div className="employee-task-stat-card">
          <div className="employee-task-stat-icon orange">
            <Circle size={20} />
          </div>
          <span>Pending</span>
          <strong>{stats.pending}</strong>
          <small>Awaiting action</small>
        </div>
      </div>

      <section className="employee-task-overview">
        <div className="employee-task-overview-top">
          <div>
            <h3>Task Completion</h3>
            <p>Your overall task completion rate</p>
          </div>
          <strong>{stats.completion}%</strong>
        </div>

        <div className="employee-task-progress-track">
          <div
            className="employee-task-progress-fill"
            style={{ width: `${stats.completion}%` }}
          />
        </div>

        <div className="employee-task-overview-footer">
          <span>{stats.completed} tasks completed</span>
          <span>{stats.total - stats.completed} remaining</span>
        </div>
      </section>

      <div className="employee-task-list-heading">
        <div>
          <h3>Assigned Tasks</h3>
          <p>Manage and update your assigned work</p>
        </div>
        <span>{filteredTasks.length} tasks</span>
      </div>

      <div className="employee-task-filters">
        <div className="employee-task-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="employee-task-filter-select">
          <Filter size={16} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <select
          className="employee-task-category-select"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Environmental">Environmental</option>
          <option value="Social">Social</option>
          <option value="Governance">Governance</option>
        </select>
      </div>

      <div className="employee-task-list">
        {filteredTasks.map((task) => {
          const CategoryIcon = categoryIcons[task.category];

          return (
            <article className="employee-task-card" key={task.id}>
              <div className="employee-task-card-main">
                <div className={`employee-task-category-icon ${task.category.toLowerCase()}`}>
                  <CategoryIcon size={20} />
                </div>

                <div className="employee-task-card-content">
                  <div className="employee-task-card-title-row">
                    <h3>{task.title}</h3>
                    <span
                      className={`employee-task-status status-${task.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {task.status === "Completed" && (
                        <CheckCircle2 size={13} />
                      )}
                      {task.status === "In Progress" && (
                        <Clock size={13} />
                      )}
                      {task.status === "Pending" && (
                        <Circle size={13} />
                      )}
                      {task.status}
                    </span>
                  </div>

                  <p>{task.description}</p>

                  <div className="employee-task-meta">
                    <span>{task.category}</span>
                    <span>
                      <CalendarDays size={14} />
                      Due {formatDate(task.dueDate)}
                    </span>
                    <span className={`employee-task-priority ${task.priority.toLowerCase()}`}>
                      {task.priority} Priority
                    </span>
                  </div>

                  <div className="employee-task-card-progress">
                    <div className="employee-task-progress-label">
                      <span>Progress</span>
                      <strong>{task.progress}%</strong>
                    </div>

                    <div className="employee-task-progress-track">
                      <div
                        className="employee-task-progress-fill"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="employee-task-card-actions">
                {task.status !== "Completed" ? (
                  <>
                    <label>
                      Update progress
                      <select
                        value={task.progress}
                        onChange={(event) =>
                          updateProgress(task.id, event.target.value)
                        }
                      >
                        <option value={0}>0% — Not started</option>
                        <option value={25}>25% — Started</option>
                        <option value={50}>50% — Halfway</option>
                        <option value={75}>75% — Almost done</option>
                        <option value={100}>100% — Completed</option>
                      </select>
                    </label>

                    <button
                      className="employee-task-complete-btn"
                      onClick={() =>
                        updateTaskStatus(task.id, "Completed")
                      }
                    >
                      <CheckCircle2 size={16} />
                      Mark Complete
                    </button>
                  </>
                ) : (
                  <div className="employee-task-done">
                    <CheckCircle2 size={17} />
                    Task completed
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="employee-task-empty">
          <ClipboardList size={32} />
          <h3>No tasks found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
