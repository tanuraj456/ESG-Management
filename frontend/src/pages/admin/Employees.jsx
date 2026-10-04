
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  Clock,
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Download,
  Filter,
  Copy,
  Eye,
  EyeOff,
  CheckCircle2,
  Building2,
  Mail,
  ShieldCheck,
  KeyRound,
  Leaf,
} from "lucide-react";

const initialEmployees = [
  {
    id: "EMP-1001",
    name: "Aarav Sharma",
    email: "aarav.sharma@ecospher.com",
    department: "Engineering",
    role: "Manager",
    status: "Active",
    joined: "2024-02-12",
    esgScore: 92,
    password: "Eco@1001",
  },
  {
    id: "EMP-1002",
    name: "Priya Mehta",
    email: "priya.mehta@ecospher.com",
    department: "Human Resources",
    role: "Employee",
    status: "Active",
    joined: "2024-04-08",
    esgScore: 88,
    password: "Eco@1002",
  },
  {
    id: "EMP-1003",
    name: "Rohan Verma",
    email: "rohan.verma@ecospher.com",
    department: "Finance",
    role: "Manager",
    status: "Active",
    joined: "2023-11-20",
    esgScore: 76,
    password: "Eco@1003",
  },
  {
    id: "EMP-1004",
    name: "Ananya Singh",
    email: "ananya.singh@ecospher.com",
    department: "Marketing",
    role: "Employee",
    status: "On Leave",
    joined: "2024-06-15",
    esgScore: 84,
    password: "Eco@1004",
  },
  {
    id: "EMP-1005",
    name: "Kabir Joshi",
    email: "kabir.joshi@ecospher.com",
    department: "Operations",
    role: "Employee",
    status: "Active",
    joined: "2024-08-01",
    esgScore: 69,
    password: "Eco@1005",
  },
  {
    id: "EMP-1006",
    name: "Meera Kapoor",
    email: "meera.kapoor@ecospher.com",
    department: "Engineering",
    role: "Employee",
    status: "Inactive",
    joined: "2023-09-18",
    esgScore: 95,
    password: "Eco@1006",
  },
];

const departments = [
  "Engineering",
  "Human Resources",
  "Finance",
  "Marketing",
  "Operations",
  "Sustainability",
];

const emptyForm = {
  name: "",
  email: "",
  department: "Engineering",
  role: "Employee",
  status: "Active",
};

function generateEmployeeId(employees) {
  const highest = employees.reduce((max, employee) => {
    const number = Number(employee.id.replace("EMP-", ""));
    return Math.max(max, number || 0);
  }, 1000);

  return `EMP-${highest + 1}`;
}

function generatePassword() {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `Eco@${random}9`;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [message, setMessage] = useState("");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchMatch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.id.toLowerCase().includes(search.toLowerCase());

      const departmentMatch =
        departmentFilter === "All Departments" ||
        employee.department === departmentFilter;

      const statusMatch =
        statusFilter === "All Status" || employee.status === statusFilter;

      return searchMatch && departmentMatch && statusMatch;
    });
  }, [employees, search, departmentFilter, statusFilter]);

  const activeCount = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveCount = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const leaveCount = employees.filter(
    (employee) => employee.status === "On Leave"
  ).length;

  const averageScore = employees.length
    ? Math.round(
        employees.reduce((total, employee) => total + employee.esgScore, 0) /
          employees.length
      )
    : 0;

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setGeneratedCredentials(null);
    setShowPassword(false);
    setShowModal(true);
  }

  function openEditModal(employee) {
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      status: employee.status,
    });
    setGeneratedCredentials(null);
    setShowPassword(false);
    setShowModal(true);
    setMenuId(null);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
    setGeneratedCredentials(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const duplicateEmail = employees.some(
      (employee) =>
        employee.email.toLowerCase() === form.email.trim().toLowerCase() &&
        employee.id !== editingId
    );

    if (duplicateEmail) {
      setMessage("An employee with this email already exists.");
      return;
    }

    if (editingId) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                ...form,
                name: form.name.trim(),
                email: form.email.trim().toLowerCase(),
              }
            : employee
        )
      );

      setMessage("Employee details updated successfully.");
      closeModal();
      return;
    }

    const employeeId = generateEmployeeId(employees);
    const password = generatePassword();

    const newEmployee = {
      id: employeeId,
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      joined: new Date().toISOString().slice(0, 10),
      esgScore: 0,
      password,
    };

    setEmployees((current) => [newEmployee, ...current]);
    setGeneratedCredentials({
      id: employeeId,
      email: newEmployee.email,
      password,
    });
    setMessage("Employee created successfully.");
    setForm(emptyForm);
  }

  function deleteEmployee() {
    setEmployees((current) =>
      current.filter((employee) => employee.id !== confirmDelete)
    );
    setConfirmDelete(null);
    setMenuId(null);
    setMessage("Employee removed successfully.");
  }

  function copyCredentials() {
    if (!generatedCredentials) return;

    const text = `Employee ID: ${generatedCredentials.id}\nEmail: ${generatedCredentials.email}\nPassword: ${generatedCredentials.password}`;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setMessage("Credentials copied to clipboard.");
    } else {
      setMessage("Clipboard is not available in this browser.");
    }
  }

  function exportEmployees() {
    const headers = [
      "Employee ID",
      "Name",
      "Email",
      "Department",
      "Role",
      "Status",
      "Join Date",
      "ESG Score",
    ];

    const rows = filteredEmployees.map((employee) => [
      employee.id,
      employee.name,
      employee.email,
      employee.department,
      employee.role,
      employee.status,
      employee.joined,
      employee.esgScore,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecospher-employees.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function dismissMessage() {
    setMessage("");
  }

  return (
    <div className="employees-page">
      <div className="employees-header">
        <div>
          <div className="employees-breadcrumb">
            Admin <span>/</span> Employees
          </div>
          <h1>Employee Management</h1>
          <p>
            Manage your workforce, access roles, and employee ESG
            participation.
          </p>
        </div>

        <div className="employees-header-actions">
          <button className="employees-export-btn" onClick={exportEmployees}>
            <Download size={17} />
            Export CSV
          </button>
          <button className="employees-add-btn" onClick={openAddModal}>
            <Plus size={18} />
            Add Employee
          </button>
        </div>
      </div>

      {message && (
        <div className="employees-toast" role="status">
          <CheckCircle2 size={18} />
          {message}
          <button onClick={dismissMessage} aria-label="Dismiss notification">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="employees-stats-grid">
        <div className="employees-stat-card">
          <div className="employees-stat-icon total">
            <Users size={21} />
          </div>
          <div className="employees-stat-content">
            <span>Total Employees</span>
            <strong>{employees.length}</strong>
            <small>Across all departments</small>
          </div>
        </div>

        <div className="employees-stat-card">
          <div className="employees-stat-icon active">
            <UserCheck size={21} />
          </div>
          <div className="employees-stat-content">
            <span>Active Employees</span>
            <strong>{activeCount}</strong>
            <small>Currently working</small>
          </div>
        </div>

        <div className="employees-stat-card">
          <div className="employees-stat-icon leave">
            <Clock size={21} />
          </div>
          <div className="employees-stat-content">
            <span>On Leave</span>
            <strong>{leaveCount}</strong>
            <small>Temporarily away</small>
          </div>
        </div>

        <div className="employees-stat-card">
          <div className="employees-stat-icon inactive">
            <UserX size={21} />
          </div>
          <div className="employees-stat-content">
            <span>Inactive</span>
            <strong>{inactiveCount}</strong>
            <small>Not currently active</small>
          </div>
        </div>

        <div className="employees-stat-card">
          <div className="employees-stat-icon esg">
            <Leaf size={21} />
          </div>
          <div className="employees-stat-content">
            <span>Average ESG Score</span>
            <strong>{averageScore}%</strong>
            <small>Workforce participation</small>
          </div>
        </div>
      </div>

      <div className="employees-directory">
        <div className="employees-directory-heading">
          <div>
            <h2>Employee Directory</h2>
            <p>
              Showing {filteredEmployees.length} of {employees.length}{" "}
              employees
            </p>
          </div>
        </div>

        <div className="employees-toolbar">
          <div className="employees-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or employee ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="employees-filter">
            <Filter size={17} />
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              aria-label="Filter by department"
            >
              <option>All Departments</option>
              {departments.map((department) => (
                <option key={department}>{department}</option>
              ))}
            </select>
          </div>

          <div className="employees-filter">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
          </div>
        </div>

        <div className="employees-table-wrap">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>ESG Score</th>
                <th>Join Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employees-person">
                      <div className="employees-avatar">
                        {employee.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <strong>{employee.name}</strong>
                        <span>{employee.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="employees-id">{employee.id}</span>
                  </td>

                  <td>
                    <div className="employees-department">
                      <Building2 size={15} />
                      {employee.department}
                    </div>
                  </td>

                  <td>
                    <span className="employees-role">
                      {employee.role === "Admin" && <ShieldCheck size={14} />}
                      {employee.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`employees-status ${employee.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span className="employees-status-dot"></span>
                      {employee.status}
                    </span>
                  </td>

                  <td>
                    <div className="employees-score">
                      <div className="employees-score-track">
                        <div
                          className="employees-score-fill"
                          style={{ width: `${employee.esgScore}%` }}
                        ></div>
                      </div>
                      <strong>{employee.esgScore}%</strong>
                    </div>
                  </td>

                  <td>{formatDate(employee.joined)}</td>

                  <td className="employees-actions-cell">
                    <div className="employees-menu-container">
                      <button
                        className="employees-menu-btn"
                        onClick={() =>
                          setMenuId(
                            menuId === employee.id ? null : employee.id
                          )
                        }
                        aria-label={`Actions for ${employee.name}`}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {menuId === employee.id && (
                        <div className="employees-action-menu">
                          <button onClick={() => openEditModal(employee)}>
                            <Pencil size={15} />
                            Edit Employee
                          </button>
                          <button
                            className="delete"
                            onClick={() => {
                              setConfirmDelete(employee.id);
                              setMenuId(null);
                            }}
                          >
                            <Trash2 size={15} />
                            Remove Employee
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="employees-empty">
                      <Users size={30} />
                      <strong>No employees found</strong>
                      <span>Try changing your search or filter settings.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="employees-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            className="employees-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="employee-modal-title"
          >
            <div className="employees-modal-header">
              <div>
                <h2 id="employee-modal-title">
                  {editingId ? "Edit Employee" : "Add New Employee"}
                </h2>
                <p>
                  {editingId
                    ? "Update employee information and access."
                    : "Enter employee details to create a new account."}
                </p>
              </div>
              <button
                className="employees-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {generatedCredentials ? (
              <div className="employees-credentials">
                <div className="employees-credentials-icon">
                  <CheckCircle2 size={30} />
                </div>
                <h3>Employee Created Successfully!</h3>
                <p>
                  Save these demo credentials. The password is shown only in
                  this confirmation.
                </p>

                <div className="employees-credential-row">
                  <span>Employee ID</span>
                  <strong>{generatedCredentials.id}</strong>
                </div>
                <div className="employees-credential-row">
                  <span>Email</span>
                  <strong>{generatedCredentials.email}</strong>
                </div>
                <div className="employees-credential-row">
                  <span>Password</span>
                  <strong>{generatedCredentials.password}</strong>
                </div>

                <button
                  className="employees-copy-btn"
                  onClick={copyCredentials}
                >
                  <Copy size={16} />
                  Copy Credentials
                </button>
                <button
                  className="employees-add-btn employees-done-btn"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="employees-form-grid">
                  <label className="employees-form-field full">
                    <span>Full Name *</span>
                    <div className="employees-input-wrap">
                      <Users size={17} />
                      <input
                        required
                        minLength={2}
                        value={form.name}
                        onChange={(event) =>
                          setForm({ ...form, name: event.target.value })
                        }
                        placeholder="Enter full name"
                      />
                    </div>
                  </label>

                  <label className="employees-form-field full">
                    <span>Email Address *</span>
                    <div className="employees-input-wrap">
                      <Mail size={17} />
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                          setForm({ ...form, email: event.target.value })
                        }
                        placeholder="name@company.com"
                      />
                    </div>
                  </label>

                  <label className="employees-form-field">
                    <span>Department *</span>
                    <select
                      value={form.department}
                      onChange={(event) =>
                        setForm({ ...form, department: event.target.value })
                      }
                    >
                      {departments.map((department) => (
                        <option key={department}>{department}</option>
                      ))}
                    </select>
                  </label>

                  <label className="employees-form-field">
                    <span>Role *</span>
                    <select
                      value={form.role}
                      onChange={(event) =>
                        setForm({ ...form, role: event.target.value })
                      }
                    >
                      <option>Employee</option>
                      <option>Manager</option>
                      <option>Admin</option>
                    </select>
                  </label>

                  <label className="employees-form-field full">
                    <span>Account Status *</span>
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm({ ...form, status: event.target.value })
                      }
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>On Leave</option>
                    </select>
                  </label>
                </div>

                {!editingId && (
                  <div className="employees-password-note">
                    <KeyRound size={17} />
                    <span>
                      A unique employee ID and temporary demo password will be
                      generated automatically.
                    </span>
                  </div>
                )}

                <div className="employees-modal-actions">
                  <button
                    type="button"
                    className="employees-cancel-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="employees-add-btn">
                    {editingId ? "Save Changes" : "Create Employee"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="employees-modal-overlay">
          <div className="employees-confirm-modal" role="alertdialog">
            <div className="employees-confirm-icon">
              <Trash2 size={24} />
            </div>
            <h3>Remove Employee?</h3>
            <p>
              This will remove the employee from the current demo directory.
              This action cannot be undone.
            </p>
            <div className="employees-modal-actions">
              <button
                className="employees-cancel-btn"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="employees-delete-btn"
                onClick={deleteEmployee}
              >
                Remove Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
