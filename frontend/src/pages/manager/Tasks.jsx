import { useMemo, useState } from "react";
import {
  ClipboardList,
  Plus,
  Search,
  CalendarDays,
  User,
  Clock3,
  CheckCircle2,
  CircleAlert,
  Circle,
  ListTodo,
  X,
  ArrowUpRight,
  Leaf,
  Filter,
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Complete monthly carbon emission report",
    description:
      "Collect and consolidate carbon emission data from all department units.",
    assignee: "Aarav Sharma",
    category: "Environmental",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-10-08",
    progress: 65,
  },
  {
    id: 2,
    title: "Organise employee sustainability workshop",
    description:
      "Plan a workshop to promote sustainable practices among employees.",
    assignee: "Priya Mehta",
    category: "Social",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-10-12",
    progress: 0,
  },
  {
    id: 3,
    title: "Review departmental ESG documentation",
    description:
      "Verify supporting documents and evidence for the quarterly ESG review.",
    assignee: "Ananya Singh",
    category: "Governance",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-10-06",
    progress: 80,
  },
  {
    id: 4,
    title: "Submit waste reduction initiative results",
    description:
      "Prepare the final report on recycling and waste reduction outcomes.",
    assignee: "Rohan Verma",
    category: "Environmental",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-10-02",
    progress: 100,
  },
  {
    id: 5,
    title: "Update employee volunteering records",
    description:
      "Update participation hours and supporting records for the current quarter.",
    assignee: "Sneha Joshi",
    category: "Social",
    priority: "Low",
    status: "Pending",
    dueDate: "2026-10-18",
    progress: 0,
  },
  {
    id: 6,
    title: "Prepare compliance review checklist",
    description:
      "Create a checklist for the upcoming internal governance assessment.",
    assignee: "Ananya Singh",
    category: "Governance",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-10-05",
    progress: 45,
  },
  {
    id: 7,
    title: "Conduct energy consumption audit",
    description:
      "Review electricity usage and identify opportunities for energy savings.",
    assignee: "Aarav Sharma",
    category: "Environmental",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-10-22",
    progress: 0,
  },
  {
    id: 8,
    title: "Publish monthly ESG progress update",
    description:
      "Prepare a concise progress update for department stakeholders.",
    assignee: "Ishita Rao",
    category: "Governance",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-10-01",
    progress: 100,
  },
];

const teamMembers = [
  "Aarav Sharma",
  "Priya Mehta",
  "Rohan Verma",
  "Ananya Singh",
  "Karan Patel",
  "Sneha Joshi",
  "Dev Malhotra",
  "Ishita Rao",
];

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const isOverdue = (task) =>
  task.status !== "Completed" &&
  new Date(`${task.dueDate}T23:59:59`) < new Date();

function StatusBadge({ status }) {
  const classes = {
    Pending: "task-status pending",
    "In Progress": "task-status progress",
    Completed: "task-status completed",
  };

  return (
    <span className={classes[status]}>
      {status === "Completed" ? (
        <CheckCircle2 size={12} />
      ) : status === "In Progress" ? (
        <Clock3 size={12} />
      ) : (
        <Circle size={12} />
      )}
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span className={`task-priority ${priority.toLowerCase()}`}>
      <span className="priority-dot" />
      {priority}
    </span>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    category: "Environmental",
    priority: "Medium",
    dueDate: "",
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const overdueTasks = tasks.filter(isOverdue).length;

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const handleCreateTask = (event) => {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      ...formData,
      status: "Pending",
      progress: 0,
    };

    setTasks((previous) => [newTask, ...previous]);

    setFormData({
      title: "",
      description: "",
      assignee: "",
      category: "Environmental",
      priority: "Medium",
      dueDate: "",
    });

    setShowForm(false);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              progress:
                newStatus === "Completed"
                  ? 100
                  : newStatus === "Pending"
                    ? 0
                    : Math.max(task.progress, 10),
            }
          : task
      )
    );

    setSelectedTask((previous) =>
      previous && previous.id === taskId
        ? {
            ...previous,
            status: newStatus,
            progress:
              newStatus === "Completed"
                ? 100
                : newStatus === "Pending"
                  ? 0
                  : Math.max(previous.progress, 10),
          }
        : previous
    );
  };

  return (
    <div className="manager-tasks-page">
      <style>{`
        .manager-tasks-page {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding-bottom: 35px;
          color: var(--text-primary);
        }

        .tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 26px;
        }

        .tasks-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 9px;
          color: var(--primary);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .tasks-header h1 {
          margin: 0 0 8px;
          color: var(--text-primary);
          font-size: clamp(25px, 3vw, 32px);
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .tasks-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
        }

        .tasks-primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 42px;
          padding: 10px 16px;
          border: 1px solid var(--primary);
          border-radius: 10px;
          background: var(--primary);
          color: #fff;
          font-size: 12px;
          font-weight: 650;
          cursor: pointer;
          transition: 0.2s ease;
          white-space: nowrap;
        }

        .tasks-primary-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
        }

        .tasks-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .task-stat-card {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          min-width: 0;
          padding: 18px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 15px;
          box-shadow: var(--shadow);
        }

        .task-stat-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 12px;
        }

        .task-stat-card span {
          display: block;
          margin-bottom: 6px;
          color: var(--text-secondary);
          font-size: 11px;
        }

        .task-stat-card strong {
          display: block;
          color: var(--text-primary);
          font-size: 23px;
          font-weight: 750;
          letter-spacing: -0.6px;
        }

        .task-stat-card small {
          display: block;
          margin-top: 5px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .tasks-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 26px;
        }

        .tasks-overview-card {
          padding: 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 15px;
          box-shadow: var(--shadow);
        }

        .tasks-overview-card h2 {
          margin: 0 0 5px;
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 700;
        }

        .tasks-overview-card p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 11px;
        }

        .task-overview-bar {
          display: flex;
          width: 100%;
          height: 12px;
          gap: 3px;
          overflow: hidden;
          margin: 20px 0 15px;
          border-radius: 20px;
          background: var(--progress-bg);
        }

        .task-overview-segment {
          height: 100%;
          border-radius: 5px;
          transition: width 0.3s ease;
        }

        .task-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .task-legend-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 10px;
        }

        .task-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .task-overdue-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 17px;
          padding: 13px;
          border-radius: 10px;
          background: #F8F0DF;
          color: #956B20;
        }

        .task-overdue-note strong {
          display: block;
          margin-bottom: 4px;
          font-size: 12px;
        }

        .task-overdue-note span {
          display: block;
          font-size: 11px;
          line-height: 1.5;
        }

        .tasks-directory {
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow);
        }

        .tasks-directory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 20px;
          border-bottom: 1px solid var(--border);
        }

        .tasks-directory-header h2 {
          margin: 0 0 5px;
          color: var(--text-primary);
          font-size: 17px;
          font-weight: 700;
        }

        .tasks-directory-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .tasks-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
        }

        .tasks-search {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 240px;
          height: 38px;
          padding: 0 11px;
          color: var(--text-muted);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 9px;
        }

        .tasks-search input {
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font-size: 12px;
        }

        .tasks-search input::placeholder {
          color: var(--text-muted);
        }

        .tasks-filter-select {
          height: 38px;
          padding: 0 11px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 12px;
          outline: 0;
        }

        .tasks-result-count {
          margin-left: auto;
          color: var(--text-muted);
          font-size: 11px;
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
        }

        .task-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 135px 110px 115px 95px;
          align-items: center;
          gap: 15px;
          padding: 17px 20px;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s ease;
        }

        .task-row:last-child {
          border-bottom: 0;
        }

        .task-row:hover {
          background: var(--surface-hover);
        }

        .task-main {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          min-width: 0;
        }

        .task-main-icon {
          display: grid;
          place-items: center;
          width: 37px;
          height: 37px;
          flex-shrink: 0;
          border-radius: 10px;
          background: #EAF0D9;
          color: #3F6B43;
        }

        .task-main h3 {
          margin: 0 0 6px;
          color: var(--text-primary);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;
        }

        .task-main p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 10px;
          line-height: 1.5;
        }

        .task-category {
          display: inline-block;
          margin-top: 7px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .task-assignee {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--text-secondary);
          font-size: 10px;
        }

        .task-date {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          color: var(--text-secondary);
          font-size: 10px;
          line-height: 1.5;
        }

        .task-date.overdue {
          color: #B65E4D;
          font-weight: 700;
        }

        .task-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          width: fit-content;
          padding: 5px 8px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .task-status.pending {
          background: #F8F0DF;
          color: #956B20;
        }

        .task-status.progress {
          background: #E5F0F0;
          color: #477B83;
        }

        .task-status.completed {
          background: #DDF2E5;
          color: #28694A;
        }

        .task-priority {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 10px;
          font-weight: 650;
        }

        .priority-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .task-priority.high .priority-dot {
          background: #C56B57;
        }

        .task-priority.medium .priority-dot {
          background: #C69A43;
        }

        .task-priority.low .priority-dot {
          background: #6D9B70;
        }

        .task-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 7px 9px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--primary);
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
        }

        .task-action-btn:hover {
          background: var(--surface-secondary);
        }

        .tasks-empty {
          padding: 45px 20px;
          text-align: center;
          color: var(--text-secondary);
        }

        .tasks-empty h3 {
          margin: 10px 0 5px;
          color: var(--text-primary);
          font-size: 15px;
        }

        .tasks-empty p {
          margin: 0;
          font-size: 12px;
        }

        .task-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 500;
          display: grid;
          place-items: center;
          padding: 18px;
          background: rgba(14, 30, 19, 0.48);
        }

        .task-modal {
          width: min(100%, 480px);
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-lg);
        }

        .task-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .task-modal-header h2 {
          margin: 0 0 6px;
          color: var(--text-primary);
          font-size: 19px;
        }

        .task-modal-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .task-close-btn {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
        }

        .task-form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 14px;
        }

        .task-form-field label {
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 650;
        }

        .task-form-field input,
        .task-form-field select,
        .task-form-field textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-primary);
          font-size: 12px;
        }

        .task-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 20px;
        }

        .task-cancel-btn {
          padding: 10px 15px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .task-detail-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin: 18px 0;
        }

        .task-detail-box {
          padding: 13px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface-secondary);
        }

        .task-detail-box span {
          display: block;
          margin-bottom: 6px;
          color: var(--text-secondary);
          font-size: 10px;
        }

        .task-detail-box strong {
          color: var(--text-primary);
          font-size: 13px;
        }

        .task-detail-description {
          margin: 15px 0;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.7;
        }

        .task-status-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 17px;
        }

        .task-status-actions button {
          flex: 1;
          min-width: 110px;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
        }

        .task-status-actions button.active {
          border-color: var(--primary);
          background: var(--surface-secondary);
          color: var(--primary);
        }

        @media (max-width: 1100px) {
          .tasks-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .task-row {
            grid-template-columns: minmax(0, 1fr) 120px 100px 95px;
          }

          .task-row .task-priority-cell {
            display: none;
          }
        }

        @media (max-width: 750px) {
          .tasks-overview {
            grid-template-columns: 1fr;
          }

          .task-row {
            grid-template-columns: minmax(0, 1fr) 100px;
            gap: 10px;
          }

          .task-row .task-assignee-cell,
          .task-row .task-priority-cell {
            display: none;
          }

          .task-row .task-date-cell {
            grid-column: 1;
          }

          .task-row .task-action-cell {
            grid-column: 2;
            grid-row: 2;
            justify-self: end;
          }
        }

        @media (max-width: 600px) {
          .tasks-header {
            flex-direction: column;
          }

          .tasks-primary-btn {
            width: 100%;
          }

          .tasks-stats {
            gap: 10px;
          }

          .task-stat-card {
            padding: 13px;
            gap: 9px;
          }

          .task-stat-icon {
            width: 36px;
            height: 36px;
          }

          .task-stat-card strong {
            font-size: 19px;
          }

          .tasks-search {
            width: 100%;
          }

          .tasks-result-count {
            width: 100%;
            margin-left: 0;
          }

          .task-row {
            padding: 14px;
          }
        }
      `}</style>

      <header className="tasks-header">
        <div>
          <div className="tasks-eyebrow">
            <ClipboardList size={14} />
            Manager Workspace / Tasks
          </div>
          <h1>Tasks</h1>
          <p>
            Assign work, track deadlines, and keep your department's ESG
            activities moving forward.
          </p>
        </div>

        <button
          className="tasks-primary-btn"
          onClick={() => setShowForm(true)}
        >
          <Plus size={16} />
          Create Task
        </button>
      </header>

      <section className="tasks-stats">
        <div className="task-stat-card">
          <div
            className="task-stat-icon"
            style={{ background: "#EAF0D9", color: "#3F6B43" }}
          >
            <ListTodo size={21} />
          </div>
          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
            <small>Across all categories</small>
          </div>
        </div>

        <div className="task-stat-card">
          <div
            className="task-stat-icon"
            style={{ background: "#E5F0F0", color: "#477B83" }}
          >
            <Clock3 size={21} />
          </div>
          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
            <small>Currently being worked on</small>
          </div>
        </div>

        <div className="task-stat-card">
          <div
            className="task-stat-icon"
            style={{ background: "#DDF2E5", color: "#28694A" }}
          >
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
            <small>
              {totalTasks
                ? Math.round((completedTasks / totalTasks) * 100)
                : 0}
              % completion rate
            </small>
          </div>
        </div>

        <div className="task-stat-card">
          <div
            className="task-stat-icon"
            style={{ background: "#F8F0DF", color: "#956B20" }}
          >
            <CircleAlert size={21} />
          </div>
          <div>
            <span>Overdue Tasks</span>
            <strong>{overdueTasks}</strong>
            <small>Require immediate attention</small>
          </div>
        </div>
      </section>

      <section className="tasks-overview">
        <div className="tasks-overview-card">
          <h2>Task Distribution</h2>
          <p>Current status of all departmental tasks.</p>

          <div className="task-overview-bar">
            <div
              className="task-overview-segment"
              style={{
                width: `${totalTasks ? (completedTasks / totalTasks) * 100 : 0}%`,
                background: "#6D9B70",
              }}
            />
            <div
              className="task-overview-segment"
              style={{
                width: `${totalTasks ? (inProgressTasks / totalTasks) * 100 : 0}%`,
                background: "#76A9AD",
              }}
            />
            <div
              className="task-overview-segment"
              style={{
                width: `${totalTasks ? (pendingTasks / totalTasks) * 100 : 0}%`,
                background: "#C69A43",
              }}
            />
          </div>

          <div className="task-legend">
            <span className="task-legend-item">
              <span
                className="task-legend-dot"
                style={{ background: "#6D9B70" }}
              />
              Completed ({completedTasks})
            </span>
            <span className="task-legend-item">
              <span
                className="task-legend-dot"
                style={{ background: "#76A9AD" }}
              />
              In Progress ({inProgressTasks})
            </span>
            <span className="task-legend-item">
              <span
                className="task-legend-dot"
                style={{ background: "#C69A43" }}
              />
              Pending ({pendingTasks})
            </span>
          </div>
        </div>

        <div className="tasks-overview-card">
          <h2>Attention Required</h2>
          <p>Tasks that may need manager follow-up.</p>

          <div className="task-overdue-note">
            <CircleAlert size={19} />
            <div>
              <strong>
                {overdueTasks} overdue {overdueTasks === 1 ? "task" : "tasks"}
              </strong>
              <span>
                Review overdue assignments and coordinate with the
                responsible team members.
              </span>
            </div>
          </div>

          <div className="task-overdue-note">
            <Clock3 size={19} />
            <div>
              <strong>{pendingTasks} pending tasks</strong>
              <span>
                Assign priorities and encourage owners to begin their work.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="tasks-directory">
        <div className="tasks-directory-header">
          <div>
            <h2>Task Directory</h2>
            <p>Manage and monitor all departmental assignments.</p>
          </div>
        </div>

        <div className="tasks-filters">
          <label className="tasks-search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search tasks or assignees..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <select
            className="tasks-filter-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="tasks-filter-select"
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            aria-label="Filter by priority"
          >
            <option value="All">All priorities</option>
            <option value="High">High priority</option>
            <option value="Medium">Medium priority</option>
            <option value="Low">Low priority</option>
          </select>

          <span className="tasks-result-count">
            Showing {filteredTasks.length} of {totalTasks} tasks
          </span>
        </div>

        <div className="tasks-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <article className="task-row" key={task.id}>
                <div className="task-main">
                  <div className="task-main-icon">
                    <Leaf size={18} />
                  </div>

                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <span className="task-category">{task.category}</span>
                  </div>
                </div>

                <div className="task-assignee-cell">
                  <div className="task-assignee">
                    <User size={14} />
                    {task.assignee}
                  </div>
                </div>

                <div className="task-priority-cell">
                  <PriorityBadge priority={task.priority} />
                </div>

                <div className="task-date-cell">
                  <div
                    className={`task-date ${
                      isOverdue(task) ? "overdue" : ""
                    }`}
                  >
                    <CalendarDays size={14} />
                    <span>
                      {formatDate(task.dueDate)}
                      {isOverdue(task) && <><br />Overdue</>}
                    </span>
                  </div>
                </div>

                <div className="task-action-cell">
                  <button
                    className="task-action-btn"
                    onClick={() => setSelectedTask(task)}
                  >
                    View <ArrowUpRight size={13} />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="tasks-empty">
              <Filter size={28} />
              <h3>No tasks found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <div
          className="task-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-create-title"
          >
            <div className="task-modal-header">
              <div>
                <h2 id="task-create-title">Create New Task</h2>
                <p>Assign a new task to a department team member.</p>
              </div>

              <button
                type="button"
                className="task-close-btn"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleCreateTask}>
              <div className="task-form-field">
                <label htmlFor="task-title">Task title *</label>
                <input
                  id="task-title"
                  required
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      title: event.target.value,
                    })
                  }
                  placeholder="Enter task title"
                />
              </div>

              <div className="task-form-field">
                <label htmlFor="task-description">Description</label>
                <textarea
                  id="task-description"
                  rows={3}
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe the task"
                />
              </div>

              <div className="task-form-field">
                <label htmlFor="task-assignee">Assign to *</label>
                <select
                  id="task-assignee"
                  required
                  value={formData.assignee}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      assignee: event.target.value,
                    })
                  }
                >
                  <option value="">Select team member</option>
                  {teamMembers.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>

              <div className="task-form-field">
                <label htmlFor="task-category">ESG category *</label>
                <select
                  id="task-category"
                  value={formData.category}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      category: event.target.value,
                    })
                  }
                >
                  <option>Environmental</option>
                  <option>Social</option>
                  <option>Governance</option>
                </select>
              </div>

              <div className="task-form-field">
                <label htmlFor="task-priority">Priority *</label>
                <select
                  id="task-priority"
                  value={formData.priority}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      priority: event.target.value,
                    })
                  }
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div className="task-form-field">
                <label htmlFor="task-due-date">Due date *</label>
                <input
                  id="task-due-date"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.dueDate}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      dueDate: event.target.value,
                    })
                  }
                />
              </div>

              <div className="task-form-actions">
                <button
                  type="button"
                  className="task-cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="tasks-primary-btn">
                  Create Task
                  <Plus size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedTask && (
        <div
          className="task-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTask(null);
            }
          }}
        >
          <div
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-detail-title"
          >
            <div className="task-modal-header">
              <div>
                <h2 id="task-detail-title">Task Details</h2>
                <p>Review assignment and update its status.</p>
              </div>

              <button
                type="button"
                className="task-close-btn"
                aria-label="Close task details"
                onClick={() => setSelectedTask(null)}
              >
                <X size={17} />
              </button>
            </div>

            <h3
              style={{
                color: "var(--text-primary)",
                fontSize: 16,
                margin: "0 0 10px",
              }}
            >
              {selectedTask.title}
            </h3>

            <p className="task-detail-description">
              {selectedTask.description || "No description provided."}
            </p>

            <div className="task-detail-info">
              <div className="task-detail-box">
                <span>Assigned to</span>
                <strong>{selectedTask.assignee}</strong>
              </div>

              <div className="task-detail-box">
                <span>Category</span>
                <strong>{selectedTask.category}</strong>
              </div>

              <div className="task-detail-box">
                <span>Priority</span>
                <strong>{selectedTask.priority}</strong>
              </div>

              <div className="task-detail-box">
                <span>Due date</span>
                <strong>{formatDate(selectedTask.dueDate)}</strong>
              </div>

              <div className="task-detail-box">
                <span>Progress</span>
                <strong>{selectedTask.progress}%</strong>
              </div>

              <div className="task-detail-box">
                <span>Current status</span>
                <StatusBadge status={selectedTask.status} />
              </div>
            </div>

            <div className="task-form-field">
              <label>Update task status</label>
              <div className="task-status-actions">
                {["Pending", "In Progress", "Completed"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={
                      selectedTask.status === status ? "active" : ""
                    }
                    onClick={() =>
                      updateTaskStatus(selectedTask.id, status)
                    }
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="tasks-primary-btn"
              style={{ width: "100%", marginTop: 20 }}
              onClick={() => setSelectedTask(null)}
            >
              Done
              <CheckCircle2 size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}