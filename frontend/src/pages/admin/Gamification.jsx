
import { useMemo, useState } from "react";
import {
  Trophy,
  Target,
  Star,
  Gift,
  Users,
  Plus,
  Search,
  Archive,
  CheckCircle2,
  Clock,
  Zap,
  Award,
  X,
} from "lucide-react";

const initialChallenges = [
  {
    id: 1,
    title: "Green Commute Challenge",
    description: "Use sustainable transportation for 10 working days.",
    category: "Environmental",
    xp: 250,
    participants: 48,
    status: "Active",
    endDate: "2026-10-30",
  },
  {
    id: 2,
    title: "Zero Waste Week",
    description: "Reduce personal waste and document sustainable practices.",
    category: "Environmental",
    xp: 200,
    participants: 36,
    status: "Under Review",
    endDate: "2026-10-18",
  },
  {
    id: 3,
    title: "Community Volunteer Drive",
    description: "Participate in a community service activity.",
    category: "Social",
    xp: 300,
    participants: 62,
    status: "Active",
    endDate: "2026-11-15",
  },
  {
    id: 4,
    title: "Energy Saver Sprint",
    description: "Identify and implement energy-saving practices.",
    category: "Environmental",
    xp: 150,
    participants: 29,
    status: "Draft",
    endDate: "2026-11-20",
  },
  {
    id: 5,
    title: "ESG Awareness Quiz",
    description: "Complete the internal ESG awareness assessment.",
    category: "Governance",
    xp: 100,
    participants: 85,
    status: "Completed",
    endDate: "2026-09-30",
  },
];

const initialEmployees = [
  { id: 1, name: "Aarav Sharma", department: "Engineering", xp: 2450, completed: 18 },
  { id: 2, name: "Priya Mehta", department: "Human Resources", xp: 2200, completed: 16 },
  { id: 3, name: "Rahul Verma", department: "Operations", xp: 1980, completed: 15 },
  { id: 4, name: "Nandani Sankhla", department: "Engineering", xp: 1850, completed: 14 },
  { id: 5, name: "Sneha Joshi", department: "Marketing", xp: 1720, completed: 12 },
];

const initialBadges = [
  {
    id: 1,
    name: "Eco Champion",
    description: "Earn 1,000 XP",
    rule: "xp",
    threshold: 1000,
    icon: "🌱",
  },
  {
    id: 2,
    name: "Challenge Master",
    description: "Complete 10 challenges",
    rule: "completed",
    threshold: 10,
    icon: "🏆",
  },
  {
    id: 3,
    name: "Sustainability Star",
    description: "Earn 2,000 XP",
    rule: "xp",
    threshold: 2000,
    icon: "⭐",
  },
];

const initialRewards = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    category: "Merchandise",
    points: 500,
    stock: 12,
    icon: "🥤",
  },
  {
    id: 2,
    name: "Extra Wellness Break",
    category: "Wellness",
    points: 750,
    stock: 8,
    icon: "☕",
  },
  {
    id: 3,
    name: "Plant a Tree Certificate",
    category: "Environmental",
    points: 300,
    stock: 25,
    icon: "🌳",
  },
  {
    id: 4,
    name: "Gift Voucher",
    category: "Gift",
    points: 1200,
    stock: 5,
    icon: "🎁",
  },
];

const statusOptions = [
  "Draft",
  "Active",
  "Under Review",
  "Completed",
];

function getStatusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function Gamification() {
  const [challenges, setChallenges] = useState(initialChallenges);
  const [employees] = useState(initialEmployees);
  const [rewards, setRewards] = useState(initialRewards);
  const [activeTab, setActiveTab] = useState("Challenges");
  const [challengeFilter, setChallengeFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [notice, setNotice] = useState("");

  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    category: "Environmental",
    xp: 100,
    endDate: "",
  });

  const currentEmployee = employees.find(
    (employee) => employee.name === "Nandani Sankhla"
  );

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        challengeFilter === "All" ||
        challenge.status === challengeFilter;

      const matchesArchive =
        showArchived
          ? challenge.status === "Archived"
          : challenge.status !== "Archived";

      return matchesSearch && matchesStatus && matchesArchive;
    });
  }, [challenges, searchTerm, challengeFilter, showArchived]);

  const leaderboard = useMemo(
    () => [...employees].sort((a, b) => b.xp - a.xp),
    [employees]
  );

  const employeeBadges = initialBadges.filter((badge) => {
    if (badge.rule === "xp") {
      return currentEmployee.xp >= badge.threshold;
    }

    return currentEmployee.completed >= badge.threshold;
  });

  const totalXP = employees.reduce((sum, employee) => sum + employee.xp, 0);

  const handleCreateChallenge = (e) => {
    e.preventDefault();

    if (!newChallenge.title.trim()) {
      setNotice("Please enter a challenge title.");
      return;
    }

    const challenge = {
      ...newChallenge,
      id: Date.now(),
      xp: Number(newChallenge.xp),
      participants: 0,
      status: "Draft",
    };

    setChallenges((prev) => [challenge, ...prev]);
    setNewChallenge({
      title: "",
      description: "",
      category: "Environmental",
      xp: 100,
      endDate: "",
    });
    setShowChallengeModal(false);
    setNotice("Challenge created successfully.");
  };

  const updateChallengeStatus = (id, status) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, status } : challenge
      )
    );

    setNotice(`Challenge moved to ${status}.`);
  };

  const archiveChallenge = (id) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id
          ? { ...challenge, status: "Archived" }
          : challenge
      )
    );

    setNotice("Challenge archived successfully.");
  };

  const redeemReward = (reward) => {
    if (reward.stock <= 0) {
      setNotice("This reward is out of stock.");
      return;
    }

    if (currentEmployee.xp < reward.points) {
      setNotice("Insufficient points to redeem this reward.");
      return;
    }

    setRewards((prev) =>
      prev.map((item) =>
        item.id === reward.id
          ? { ...item, stock: item.stock - 1 }
          : item
      )
    );

    setNotice(
      `${reward.name} redeemed successfully. ${reward.points} points deducted.`
    );
  };

  return (
    <div className="gamification-page">
      {/* HEADER */}

      <div className="gamification-header">
        <div>
          <div className="gamification-breadcrumb">
            Admin <span>/</span> Gamification
          </div>

          <h1>Gamification</h1>

          <p>
            Encourage sustainable actions through challenges,
            achievements, rewards, and friendly competition.
          </p>
        </div>

        <button
          className="gamification-primary-btn"
          onClick={() => setShowChallengeModal(true)}
        >
          <Plus size={17} />
          Create Challenge
        </button>
      </div>

      {/* NOTIFICATION */}

      {notice && (
        <div className="gamification-notice" role="status">
          <CheckCircle2 size={17} />
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}

      {/* KPI CARDS */}

      <div className="gamification-kpi-grid">
        <div className="gamification-kpi-card">
          <div className="gamification-kpi-top">
            <span className="gamification-kpi-icon challenges">
              <Target size={21} />
            </span>
            <span className="gamification-kpi-tag">All challenges</span>
          </div>
          <p>Total Challenges</p>
          <h2>{challenges.filter((c) => c.status !== "Archived").length}</h2>
          <small>Across all ESG categories</small>
        </div>

        <div className="gamification-kpi-card">
          <div className="gamification-kpi-top">
            <span className="gamification-kpi-icon xp">
              <Zap size={21} />
            </span>
            <span className="gamification-kpi-tag">Organization</span>
          </div>
          <p>Total XP Earned</p>
          <h2>{totalXP.toLocaleString()}</h2>
          <small>Points earned by employees</small>
        </div>

        <div className="gamification-kpi-card">
          <div className="gamification-kpi-top">
            <span className="gamification-kpi-icon badges">
              <Award size={21} />
            </span>
            <span className="gamification-kpi-tag">Available</span>
          </div>
          <p>Badge Types</p>
          <h2>{initialBadges.length}</h2>
          <small>Configured achievement rules</small>
        </div>

        <div className="gamification-kpi-card">
          <div className="gamification-kpi-top">
            <span className="gamification-kpi-icon rewards">
              <Gift size={21} />
            </span>
            <span className="gamification-kpi-tag">Catalog</span>
          </div>
          <p>Available Rewards</p>
          <h2>{rewards.filter((r) => r.stock > 0).length}</h2>
          <small>Rewards currently in stock</small>
        </div>
      </div>

      {/* TABS */}

      <div className="gamification-tabs">
        {["Challenges", "XP & Badges", "Rewards", "Leaderboards"].map(
          (tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* CHALLENGES */}

      {activeTab === "Challenges" && (
        <section className="gamification-panel">
          <div className="gamification-panel-header">
            <div>
              <h2>Challenge Management</h2>
              <p>
                Manage challenge lifecycles, review submissions, and track
                participation.
              </p>
            </div>

            <button
              className="gamification-secondary-btn"
              onClick={() => setShowArchived((prev) => !prev)}
            >
              <Archive size={15} />
              {showArchived ? "View Active" : "View Archived"}
            </button>
          </div>

          <div className="gamification-toolbar">
            <div className="gamification-search">
              <Search size={17} />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={challengeFilter}
              onChange={(e) => setChallengeFilter(e.target.value)}
              aria-label="Filter by challenge status"
            >
              <option value="All">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="gamification-challenge-list">
            {filteredChallenges.map((challenge) => (
              <div className="gamification-challenge-card" key={challenge.id}>
                <div className="gamification-challenge-main">
                  <div className="gamification-challenge-icon">
                    <Target size={21} />
                  </div>

                  <div className="gamification-challenge-info">
                    <div className="gamification-challenge-title">
                      <h3>{challenge.title}</h3>
                      <span
                        className={`gamification-status ${getStatusClass(
                          challenge.status
                        )}`}
                      >
                        {challenge.status}
                      </span>
                    </div>

                    <p>{challenge.description}</p>

                    <div className="gamification-challenge-meta">
                      <span>{challenge.category}</span>
                      <span>
                        <Users size={14} /> {challenge.participants} participants
                      </span>
                      <span>
                        <Zap size={14} /> {challenge.xp} XP
                      </span>
                      <span>
                        <Clock size={14} /> {challenge.endDate || "No deadline"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="gamification-challenge-actions">
                  {challenge.status !== "Archived" && (
                    <>
                      <select
                        value={challenge.status}
                        onChange={(e) =>
                          updateChallengeStatus(
                            challenge.id,
                            e.target.value
                          )
                        }
                        aria-label={`Change status for ${challenge.title}`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <button
                        className="gamification-icon-btn"
                        title="Archive challenge"
                        aria-label={`Archive ${challenge.title}`}
                        onClick={() => archiveChallenge(challenge.id)}
                      >
                        <Archive size={16} />
                      </button>
                    </>
                  )}

                  {challenge.status === "Archived" && (
                    <button
                      className="gamification-secondary-btn"
                      onClick={() =>
                        updateChallengeStatus(challenge.id, "Draft")
                      }
                    >
                      Restore
                    </button>
                  )}
                </div>
              </div>
            ))}

            {filteredChallenges.length === 0 && (
              <div className="gamification-empty">
                No challenges found.
              </div>
            )}
          </div>
        </section>
      )}

      {/* XP AND BADGES */}

      {activeTab === "XP & Badges" && (
        <section className="gamification-panel">
          <div className="gamification-panel-header">
            <div>
              <h2>XP & Badge Management</h2>
              <p>
                Review employee points and automatically awarded badges.
              </p>
            </div>
          </div>

          <div className="gamification-profile-card">
            <div className="gamification-profile-avatar">N</div>
            <div className="gamification-profile-info">
              <strong>{currentEmployee.name}</strong>
              <span>{currentEmployee.department}</span>
            </div>
            <div className="gamification-profile-xp">
              <Zap size={18} />
              <strong>{currentEmployee.xp.toLocaleString()} XP</strong>
            </div>
          </div>

          <h3 className="gamification-subheading">Earned Badges</h3>

          <div className="gamification-badge-grid">
            {employeeBadges.map((badge) => (
              <div className="gamification-badge-card" key={badge.id}>
                <span className="gamification-badge-emoji">
                  {badge.icon}
                </span>
                <strong>{badge.name}</strong>
                <span>{badge.description}</span>
                <small>
                  <CheckCircle2 size={13} /> Automatically awarded
                </small>
              </div>
            ))}

            {employeeBadges.length === 0 && (
              <div className="gamification-empty">
                No badges earned yet.
              </div>
            )}
          </div>

          <h3 className="gamification-subheading">Badge Unlock Rules</h3>

          <div className="gamification-table-wrapper">
            <table className="gamification-table">
              <thead>
                <tr>
                  <th>Badge</th>
                  <th>Unlock Rule</th>
                  <th>Current Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {initialBadges.map((badge) => {
                  const progress =
                    badge.rule === "xp"
                      ? currentEmployee.xp
                      : currentEmployee.completed;

                  const unlocked = progress >= badge.threshold;

                  return (
                    <tr key={badge.id}>
                      <td>
                        {badge.icon} {badge.name}
                      </td>
                      <td>{badge.description}</td>
                      <td>
                        {progress.toLocaleString()} /{" "}
                        {badge.threshold.toLocaleString()}
                      </td>
                      <td>
                        <span
                          className={`gamification-status ${
                            unlocked ? "completed" : "draft"
                          }`}
                        >
                          {unlocked ? "Unlocked" : "In Progress"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* REWARDS */}

      {activeTab === "Rewards" && (
        <section className="gamification-panel">
          <div className="gamification-panel-header">
            <div>
              <h2>Rewards Catalog</h2>
              <p>
                Redeem earned XP for rewards while stock is available.
              </p>
            </div>
            <span className="gamification-points-balance">
              Your balance: {currentEmployee.xp.toLocaleString()} XP
            </span>
          </div>

          <div className="gamification-rewards-grid">
            {rewards.map((reward) => (
              <div className="gamification-reward-card" key={reward.id}>
                <div className="gamification-reward-icon">
                  {reward.icon}
                </div>

                <span className="gamification-reward-category">
                  {reward.category}
                </span>

                <h3>{reward.name}</h3>

                <div className="gamification-reward-points">
                  <Zap size={16} />
                  {reward.points.toLocaleString()} XP
                </div>

                <p>
                  {reward.stock > 0
                    ? `${reward.stock} available`
                    : "Out of stock"}
                </p>

                <button
                  className="gamification-primary-btn"
                  disabled={
                    reward.stock <= 0 ||
                    currentEmployee.xp < reward.points
                  }
                  onClick={() => redeemReward(reward)}
                >
                  {reward.stock <= 0
                    ? "Out of Stock"
                    : currentEmployee.xp < reward.points
                      ? "Insufficient XP"
                      : "Redeem Reward"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LEADERBOARD */}

      {activeTab === "Leaderboards" && (
        <section className="gamification-panel">
          <div className="gamification-panel-header">
            <div>
              <h2>Employee Leaderboard</h2>
              <p>
                Celebrate employees making the greatest sustainability impact.
              </p>
            </div>
            <span className="gamification-panel-badge">
              Top Performers
            </span>
          </div>

          <div className="gamification-leaderboard">
            {leaderboard.map((employee, index) => (
              <div
                className={`gamification-leaderboard-row ${
                  employee.name === "Nandani Sankhla" ? "current-user" : ""
                }`}
                key={employee.id}
              >
                <div className={`gamification-rank rank-${index + 1}`}>
                  {index === 0 ? <Trophy size={19} /> : index + 1}
                </div>

                <div className="gamification-leader-avatar">
                  {employee.name.charAt(0)}
                </div>

                <div className="gamification-leader-info">
                  <strong>{employee.name}</strong>
                  <span>{employee.department}</span>
                </div>

                <div className="gamification-leader-completed">
                  <strong>{employee.completed}</strong>
                  <span>Challenges</span>
                </div>

                <div className="gamification-leader-xp">
                  <Zap size={15} />
                  <strong>{employee.xp.toLocaleString()} XP</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CREATE CHALLENGE MODAL */}

      {showChallengeModal && (
        <div
          className="gamification-modal-overlay"
          onClick={() => setShowChallengeModal(false)}
        >
          <div
            className="gamification-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gamification-modal-header">
              <div>
                <span>Create New</span>
                <h2>Challenge</h2>
              </div>

              <button
                className="gamification-icon-btn"
                onClick={() => setShowChallengeModal(false)}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleCreateChallenge}>
              <label>
                Challenge Title
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter challenge title"
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  value={newChallenge.description}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the challenge"
                  rows={3}
                />
              </label>

              <div className="gamification-form-row">
                <label>
                  Category
                  <select
                    value={newChallenge.category}
                    onChange={(e) =>
                      setNewChallenge({
                        ...newChallenge,
                        category: e.target.value,
                      })
                    }
                  >
                    <option>Environmental</option>
                    <option>Social</option>
                    <option>Governance</option>
                  </select>
                </label>

                <label>
                  XP Reward
                  <input
                    type="number"
                    min="1"
                    value={newChallenge.xp}
                    onChange={(e) =>
                      setNewChallenge({
                        ...newChallenge,
                        xp: e.target.value,
                      })
                    }
                    required
                  />
                </label>
              </div>

              <label>
                End Date
                <input
                  type="date"
                  value={newChallenge.endDate}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      endDate: e.target.value,
                    })
                  }
                />
              </label>

              <div className="gamification-modal-actions">
                <button
                  type="button"
                  className="gamification-secondary-btn"
                  onClick={() => setShowChallengeModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="gamification-primary-btn"
                >
                  Create Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gamification;
