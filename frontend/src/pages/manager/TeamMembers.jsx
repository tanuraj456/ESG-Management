import { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Mail,
  BriefcaseBusiness,
  Leaf,
  Award,
  CheckCircle2,
  Clock3,
  CircleAlert,
  X,
  ArrowUpRight,
} from "lucide-react";

const initialMembers = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@ecospheretech.com",
    role: "Environmental Analyst",
    department: "Sustainability",
    initiatives: 8,
    completed: 6,
    hours: 42,
    status: "Active",
    initials: "AS",
    color: "#EAF0D9",
    textColor: "#3F6B43",
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya.mehta@ecospheretech.com",
    role: "CSR Coordinator",
    department: "Community Outreach",
    initiatives: 10,
    completed: 9,
    hours: 56,
    status: "Active",
    initials: "PM",
    color: "#E5F0F0",
    textColor: "#477B83",
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan.verma@ecospheretech.com",
    role: "Operations Executive",
    department: "Operations",
    initiatives: 5,
    completed: 3,
    hours: 24,
    status: "Active",
    initials: "RV",
    color: "#F8F0DF",
    textColor: "#956B20",
  },
  {
    id: 4,
    name: "Ananya Singh",
    email: "ananya.singh@ecospheretech.com",
    role: "Compliance Officer",
    department: "Governance",
    initiatives: 7,
    completed: 7,
    hours: 48,
    status: "Active",
    initials: "AS",
    color: "#EEECF8",
    textColor: "#7770A4",
  },
  {
    id: 5,
    name: "Karan Patel",
    email: "karan.patel@ecospheretech.com",
    role: "Software Engineer",
    department: "Technology",
    initiatives: 3,
    completed: 1,
    hours: 12,
    status: "Needs Attention",
    initials: "KP",
    color: "#F7E8E5",
    textColor: "#A45F50",
  },
  {
    id: 6,
    name: "Sneha Joshi",
    email: "sneha.joshi@ecospheretech.com",
    role: "HR Executive",
    department: "Human Resources",
    initiatives: 6,
    completed: 5,
    hours: 35,
    status: "Active",
    initials: "SJ",
    color: "#EAF0D9",
    textColor: "#3F6B43",
  },
  {
    id: 7,
    name: "Dev Malhotra",
    email: "dev.malhotra@ecospheretech.com",
    role: "Data Analyst",
    department: "Technology",
    initiatives: 4,
    completed: 2,
    hours: 18,
    status: "On Leave",
    initials: "DM",
    color: "#E5F0F0",
    textColor: "#477B83",
  },
  {
    id: 8,
    name: "Ishita Rao",
    email: "ishita.rao@ecospheretech.com",
    role: "Project Coordinator",
    department: "Sustainability",
    initiatives: 9,
    completed: 8,
    hours: 51,
    status: "Active",
    initials: "IR",
    color: "#F8F0DF",
    textColor: "#956B20",
  },
];

const statusClass = (status) => {
  if (status === "Active") return "team-status active";
  if (status === "On Leave") return "team-status leave";
  return "team-status attention";
};

export default function TeamMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showInvite, setShowInvite] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [inviteData, setInviteData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const activeCount = members.filter(
    (member) => member.status === "Active"
  ).length;

  const totalHours = members.reduce(
    (sum, member) => sum + member.hours,
    0
  );

  const totalCompleted = members.reduce(
    (sum, member) => sum + member.completed,
    0
  );

  const averageCompletion = members.length
    ? Math.round(
        (members.reduce(
          (sum, member) =>
            sum +
            (member.initiatives
              ? member.completed / member.initiatives
              : 0),
          0
        ) /
          members.length) *
          100
      )
    : 0;

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  const handleInvite = (event) => {
    event.preventDefault();

    const nameParts = inviteData.name.trim().split(/\s+/);
    const initials = nameParts
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newMember = {
      id: Date.now(),
      ...inviteData,
      initiatives: 0,
      completed: 0,
      hours: 0,
      status: "Active",
      initials,
      color: "#EAF0D9",
      textColor: "#3F6B43",
    };

    setMembers((previous) => [newMember, ...previous]);
    setInviteData({
      name: "",
      email: "",
      role: "",
      department: "",
    });
    setShowInvite(false);
  };

  return (
    <div className="team-page">
      <style>{`
        .team-page {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding-bottom: 35px;
          color: var(--text-primary);
        }

        .team-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 26px;
        }

        .team-eyebrow {
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

        .team-header h1 {
          margin: 0 0 8px;
          color: var(--text-primary);
          font-size: clamp(25px, 3vw, 32px);
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .team-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
        }

        .team-primary-btn {
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

        .team-primary-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
        }

        .team-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .team-stat-card {
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

        .team-stat-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 12px;
        }

        .team-stat-card span {
          display: block;
          margin-bottom: 6px;
          color: var(--text-secondary);
          font-size: 11px;
        }

        .team-stat-card strong {
          display: block;
          color: var(--text-primary);
          font-size: 23px;
          font-weight: 750;
          letter-spacing: -0.6px;
        }

        .team-stat-card small {
          display: block;
          margin-top: 5px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .team-directory {
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow);
        }

        .team-directory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 20px;
          border-bottom: 1px solid var(--border);
        }

        .team-directory-header h2 {
          margin: 0 0 5px;
          color: var(--text-primary);
          font-size: 17px;
          font-weight: 700;
        }

        .team-directory-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .team-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .team-search {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 230px;
          height: 38px;
          padding: 0 11px;
          color: var(--text-muted);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 9px;
        }

        .team-search input {
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

        .team-search input::placeholder {
          color: var(--text-muted);
        }

        .team-filter {
          height: 38px;
          padding: 0 11px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 12px;
          outline: 0;
        }

        .team-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .team-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .team-table th {
          padding: 13px 17px;
          background: var(--surface-secondary);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .team-table td {
          padding: 15px 17px;
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 11px;
        }

        .team-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .team-table tbody tr:hover {
          background: var(--surface-hover);
        }

        .team-member-cell {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .team-avatar {
          display: grid;
          place-items: center;
          width: 37px;
          height: 37px;
          flex-shrink: 0;
          border-radius: 11px;
          font-size: 11px;
          font-weight: 750;
        }

        .team-member-name {
          display: block;
          margin-bottom: 4px;
          color: var(--text-primary);
          font-size: 12px;
          font-weight: 700;
        }

        .team-member-email {
          display: block;
          color: var(--text-muted);
          font-size: 10px;
        }

        .team-role {
          color: var(--text-primary);
          font-weight: 600;
        }

        .team-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
        }

        .team-status.active {
          background: #DDF2E5;
          color: #28694A;
        }

        .team-status.leave {
          background: #E5F0F0;
          color: #477B83;
        }

        .team-status.attention {
          background: #F8F0DF;
          color: #956B20;
        }

        .team-progress-cell {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 115px;
        }

        .team-progress-track {
          width: 65px;
          height: 6px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--progress-bg);
        }

        .team-progress-fill {
          height: 100%;
          border-radius: inherit;
          background: #6D9B70;
        }

        .team-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 10px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--primary);
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
        }

        .team-view-btn:hover {
          background: var(--surface-secondary);
        }

        .team-empty {
          padding: 45px 20px;
          text-align: center;
          color: var(--text-secondary);
        }

        .team-empty h3 {
          margin: 10px 0 5px;
          color: var(--text-primary);
          font-size: 15px;
        }

        .team-empty p {
          margin: 0;
          font-size: 12px;
        }

        .team-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 500;
          display: grid;
          place-items: center;
          padding: 18px;
          background: rgba(14, 30, 19, 0.48);
        }

        .team-modal {
          width: min(100%, 460px);
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-lg);
        }

        .team-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .team-modal-header h2 {
          margin: 0 0 6px;
          color: var(--text-primary);
          font-size: 19px;
        }

        .team-modal-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .team-close-btn {
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

        .team-form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 14px;
        }

        .team-form-field label {
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 650;
        }

        .team-form-field input,
        .team-form-field select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-primary);
          font-size: 12px;
        }

        .team-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 20px;
        }

        .team-cancel-btn {
          padding: 10px 15px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .team-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin: 18px 0;
        }

        .team-detail-box {
          padding: 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface-secondary);
        }

        .team-detail-box span {
          display: block;
          margin-bottom: 6px;
          color: var(--text-secondary);
          font-size: 10px;
        }

        .team-detail-box strong {
          color: var(--text-primary);
          font-size: 19px;
        }

        @media (max-width: 1100px) {
          .team-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 750px) {
          .team-directory-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .team-controls {
            width: 100%;
            flex-wrap: wrap;
          }

          .team-search {
            flex: 1;
            min-width: 180px;
          }
        }

        @media (max-width: 600px) {
          .team-header {
            flex-direction: column;
          }

          .team-primary-btn {
            width: 100%;
          }

          .team-stats {
            gap: 10px;
          }

          .team-stat-card {
            padding: 13px;
            gap: 9px;
          }

          .team-stat-icon {
            width: 36px;
            height: 36px;
          }

          .team-stat-card strong {
            font-size: 19px;
          }
        }
      `}</style>

      <header className="team-header">
        <div>
          <div className="team-eyebrow">
            <Users size={14} />
            Manager Workspace / Team Members
          </div>
          <h1>Team Members</h1>
          <p>
            Manage your department team and monitor employee participation
            in sustainability initiatives.
          </p>
        </div>

        <button
          className="team-primary-btn"
          onClick={() => setShowInvite(true)}
        >
          <UserPlus size={16} />
          Add Team Member
        </button>
      </header>

      <section className="team-stats">
        <div className="team-stat-card">
          <div
            className="team-stat-icon"
            style={{ background: "#EAF0D9", color: "#3F6B43" }}
          >
            <Users size={21} />
          </div>
          <div>
            <span>Total Members</span>
            <strong>{members.length}</strong>
            <small>In your department</small>
          </div>
        </div>

        <div className="team-stat-card">
          <div
            className="team-stat-icon"
            style={{ background: "#DDF2E5", color: "#28694A" }}
          >
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Active Members</span>
            <strong>{activeCount}</strong>
            <small>Currently available</small>
          </div>
        </div>

        <div className="team-stat-card">
          <div
            className="team-stat-icon"
            style={{ background: "#E5F0F0", color: "#477B83" }}
          >
            <Award size={21} />
          </div>
          <div>
            <span>Completed Initiatives</span>
            <strong>{totalCompleted}</strong>
            <small>Combined team contributions</small>
          </div>
        </div>

        <div className="team-stat-card">
          <div
            className="team-stat-icon"
            style={{ background: "#F8F0DF", color: "#956B20" }}
          >
            <Clock3 size={21} />
          </div>
          <div>
            <span>Volunteer Hours</span>
            <strong>{totalHours}</strong>
            <small>{averageCompletion}% average completion rate</small>
          </div>
        </div>
      </section>

      <section className="team-directory">
        <div className="team-directory-header">
          <div>
            <h2>Department Directory</h2>
            <p>View team profiles and ESG contributions.</p>
          </div>

          <div className="team-controls">
            <label className="team-search">
              <Search size={16} />
              <input
                type="search"
                placeholder="Search members..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <select
              className="team-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter team members by status"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Needs Attention">Needs Attention</option>
            </select>
          </div>
        </div>

        <div className="team-table-wrap">
          <table className="team-table">
            <thead>
              <tr>
                <th>Team Member</th>
                <th>Role</th>
                <th>Department</th>
                <th>Initiatives</th>
                <th>Completion</th>
                <th>Volunteer Hours</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((member) => {
                const completion = member.initiatives
                  ? Math.round(
                      (member.completed / member.initiatives) * 100
                    )
                  : 0;

                return (
                  <tr key={member.id}>
                    <td>
                      <div className="team-member-cell">
                        <div
                          className="team-avatar"
                          style={{
                            background: member.color,
                            color: member.textColor,
                          }}
                        >
                          {member.initials}
                        </div>
                        <div>
                          <span className="team-member-name">
                            {member.name}
                          </span>
                          <span className="team-member-email">
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="team-role">{member.role}</span>
                    </td>

                    <td>{member.department}</td>

                    <td>
                      {member.completed} / {member.initiatives}
                    </td>

                    <td>
                      <div className="team-progress-cell">
                        <div className="team-progress-track">
                          <div
                            className="team-progress-fill"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                        <span>{completion}%</span>
                      </div>
                    </td>

                    <td>{member.hours} hrs</td>

                    <td>
                      <span className={statusClass(member.status)}>
                        {member.status === "Active" ? (
                          <CheckCircle2 size={12} />
                        ) : member.status === "On Leave" ? (
                          <Clock3 size={12} />
                        ) : (
                          <CircleAlert size={12} />
                        )}
                        {member.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="team-view-btn"
                        onClick={() => setSelectedMember(member)}
                      >
                        View <ArrowUpRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <div className="team-empty">
              <Search size={28} />
              <h3>No team members found</h3>
              <p>Try changing your search or status filter.</p>
            </div>
          )}
        </div>
      </section>

      {showInvite && (
        <div
          className="team-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowInvite(false);
            }
          }}
        >
          <div
            className="team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-invite-title"
          >
            <div className="team-modal-header">
              <div>
                <h2 id="team-invite-title">Add Team Member</h2>
                <p>Add a member to the department directory.</p>
              </div>
              <button
                type="button"
                className="team-close-btn"
                aria-label="Close form"
                onClick={() => setShowInvite(false)}
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleInvite}>
              <div className="team-form-field">
                <label htmlFor="member-name">Full name *</label>
                <input
                  id="member-name"
                  required
                  value={inviteData.name}
                  onChange={(event) =>
                    setInviteData({
                      ...inviteData,
                      name: event.target.value,
                    })
                  }
                  placeholder="Enter full name"
                />
              </div>

              <div className="team-form-field">
                <label htmlFor="member-email">Email address *</label>
                <input
                  id="member-email"
                  type="email"
                  required
                  value={inviteData.email}
                  onChange={(event) =>
                    setInviteData({
                      ...inviteData,
                      email: event.target.value,
                    })
                  }
                  placeholder="name@company.com"
                />
              </div>

              <div className="team-form-field">
                <label htmlFor="member-role">Role *</label>
                <input
                  id="member-role"
                  required
                  value={inviteData.role}
                  onChange={(event) =>
                    setInviteData({
                      ...inviteData,
                      role: event.target.value,
                    })
                  }
                  placeholder="Enter job role"
                />
              </div>

              <div className="team-form-field">
                <label htmlFor="member-department">Department *</label>
                <select
                  id="member-department"
                  required
                  value={inviteData.department}
                  onChange={(event) =>
                    setInviteData({
                      ...inviteData,
                      department: event.target.value,
                    })
                  }
                >
                  <option value="">Select department</option>
                  <option>Sustainability</option>
                  <option>Community Outreach</option>
                  <option>Operations</option>
                  <option>Governance</option>
                  <option>Technology</option>
                  <option>Human Resources</option>
                </select>
              </div>

              <div className="team-modal-actions">
                <button
                  type="button"
                  className="team-cancel-btn"
                  onClick={() => setShowInvite(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="team-primary-btn">
                  Add Member
                  <UserPlus size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedMember && (
        <div
          className="team-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedMember(null);
            }
          }}
        >
          <div
            className="team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-detail-title"
          >
            <div className="team-modal-header">
              <div>
                <h2 id="team-detail-title">Member Profile</h2>
                <p>ESG contribution overview</p>
              </div>
              <button
                type="button"
                className="team-close-btn"
                aria-label="Close profile"
                onClick={() => setSelectedMember(null)}
              >
                <X size={17} />
              </button>
            </div>

            <div className="team-member-cell">
              <div
                className="team-avatar"
                style={{
                  width: 52,
                  height: 52,
                  background: selectedMember.color,
                  color: selectedMember.textColor,
                  fontSize: 15,
                }}
              >
                {selectedMember.initials}
              </div>
              <div>
                <span className="team-member-name">
                  {selectedMember.name}
                </span>
                <span className="team-member-email">
                  {selectedMember.role}
                </span>
              </div>
            </div>

            <div className="team-detail-grid">
              <div className="team-detail-box">
                <span>Initiatives completed</span>
                <strong>{selectedMember.completed}</strong>
              </div>
              <div className="team-detail-box">
                <span>Total initiatives</span>
                <strong>{selectedMember.initiatives}</strong>
              </div>
              <div className="team-detail-box">
                <span>Volunteer hours</span>
                <strong>{selectedMember.hours}</strong>
              </div>
              <div className="team-detail-box">
                <span>Completion rate</span>
                <strong>
                  {selectedMember.initiatives
                    ? Math.round(
                        (selectedMember.completed /
                          selectedMember.initiatives) *
                          100
                      )
                    : 0}
                  %
                </strong>
              </div>
            </div>

            <div className="team-form-field">
              <label>Email</label>
              <div className="team-member-cell">
                <Mail size={15} />
                {selectedMember.email}
              </div>
            </div>

            <div className="team-form-field">
              <label>Department</label>
              <div className="team-member-cell">
                <BriefcaseBusiness size={15} />
                {selectedMember.department}
              </div>
            </div>

            <button
              type="button"
              className="team-primary-btn"
              style={{ width: "100%", marginTop: 12 }}
              onClick={() => setSelectedMember(null)}
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}