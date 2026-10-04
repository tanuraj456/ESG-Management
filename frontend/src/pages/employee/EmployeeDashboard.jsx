
import { useMemo, useState } from "react";
import {
  Award,
  CheckCircle2,
  Leaf,
  Trophy,
  Target,
  CalendarDays,
  Clock3,
  Zap,
  Users,
  Star,
  Circle,
  CircleCheck,
  ArrowUpRight,
  Heart,
  ShieldCheck,
  TreePine,
  Recycle,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import ESGScoreCard from "../../components/dashboard/ESGScoreCard";
import SectionHeader from "../../components/dashboard/SectionHeader";

import {
  employeeProfile,
  employeeStats,
  employeeActivities,
  employeeTasks,
  employeeAchievements,
  leaderboard,
} from "../../data/dashboardData";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState(employeeTasks);
  const [activities, setActivities] = useState(employeeActivities);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);

  // Calculate points dynamically from completed tasks
  const completedTaskPoints = tasks
    .filter((task) => task.status === "Completed")
    .reduce((total, task) => total + task.points, 0);

  const earnedActivityPoints = activities.reduce(
    (total, activity) => total + activity.points,
    0
  );

  const totalPoints =
    employeeProfile.points + completedTaskPoints;

  const nextLevelProgress = Math.min(
    (totalPoints / employeeProfile.nextLevelPoints) * 100,
    100
  );

  const remainingPoints = Math.max(
    employeeProfile.nextLevelPoints - totalPoints,
    0
  );

  // Dynamic task statistics
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  // Complete a task and award its points
  const handleCompleteTask = (taskId) => {
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

  // Filter activities
  const filteredActivities = useMemo(() => {
    if (activeFilter === "All") return activities;

    return activities.filter(
      (activity) => activity.category === activeFilter
    );
  }, [activities, activeFilter]);

  const visibleActivities = showAllActivities
    ? filteredActivities
    : filteredActivities.slice(0, 4);

  const visibleLeaderboard = showFullLeaderboard
    ? leaderboard
    : leaderboard.slice(0, 4);

  // Add a demo activity
  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(),
      title: "Green Office Action",
      category: "Environmental",
      date: new Date().toISOString().slice(0, 10),
      points: 25,
      status: "Completed",
    };

    setActivities((current) => [
      newActivity,
      ...current,
    ]);

    alert("Demo activity added! You earned 25 impact points.");
  };

  return (
    <div className="employee-dashboard">
      {/* Welcome Section */}
      <section className="dashboard-welcome employee-welcome">
        <div>
          <div className="welcome-eyebrow">
            <span className="welcome-dot" />
            YOUR SUSTAINABILITY JOURNEY
          </div>

          <h1>
            Hey, {employeeProfile.firstName} <span>✦</span>
          </h1>

          <p>
            Every small action makes a big difference.
            Here's your personal impact at EcoSphere.
          </p>

          <div className="welcome-company">
            <Users size={16} />
            <span>{employeeProfile.department}</span>
            <span className="welcome-divider">•</span>
            <span>{employeeProfile.role}</span>
          </div>
        </div>

        <div className="employee-level-badge">
          <div className="level-badge-icon">
            <Trophy size={24} />
          </div>

          <div>
            <span>YOUR CURRENT LEVEL</span>
            <strong>{employeeProfile.level}</strong>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="employee-stats-grid">
        {employeeStats.map((stat) => {
          const iconMap = {
            Award,
            CheckCircle: CheckCircle2,
            Leaf,
            Trophy,
          };

          const Icon = iconMap[stat.iconName] || Star;

          const dynamicStat =
            stat.title === "My Impact Points"
              ? {
                  ...stat,
                  value: totalPoints.toLocaleString(),
                }
              : stat.title === "Activities Completed"
              ? {
                  ...stat,
                  value: String(activities.length),
                }
              : stat;

          return (
            <StatCard
              key={stat.id}
              {...dynamicStat}
              icon={Icon}
            />
          );
        })}
      </section>

      {/* Personal Progress and ESG */}
      <section className="employee-main-grid">
        {/* Level Progress */}
        <div className="dashboard-panel employee-level-panel">
          <div className="panel-heading">
            <div>
              <h3>Level Progress</h3>
              <p>Keep earning points to unlock your next level.</p>
            </div>

            <div className="panel-icon">
              <Zap size={20} />
            </div>
          </div>

          <div className="level-progress-content">
            <div className="level-trophy">
              <Trophy size={36} />
            </div>

            <div className="level-progress-info">
              <span>YOUR IMPACT POINTS</span>
              <h2>{totalPoints.toLocaleString()}</h2>
              <p>
                {remainingPoints === 0
                  ? "Congratulations! You've reached your next level."
                  : `${remainingPoints.toLocaleString()} points to your next level`}
              </p>
            </div>
          </div>

          <div className="level-progress-track">
            <div
              className="level-progress-fill"
              style={{ width: `${nextLevelProgress}%` }}
            />
          </div>

          <div className="level-progress-labels">
            <span>{employeeProfile.level}</span>
            <span>
              Next Level: {employeeProfile.nextLevelPoints.toLocaleString()} pts
            </span>
          </div>

          <div className="level-reward-note">
            <Star size={16} />
            Complete activities and tasks to earn more rewards.
          </div>
        </div>

        {/* Personal ESG Score */}
        <ESGScoreCard
          score={88.6}
          environmental={92}
          social={86}
          governance={88}
        />
      </section>

      {/* My Tasks */}
      <section className="dashboard-panel employee-tasks-panel">
        <SectionHeader
          title="My Tasks"
          description="Complete your assigned activities and earn impact points."
          actionLabel="View All"
          onAction={() =>
            alert("Demo: Full task page coming soon.")
          }
        />

        <div className="employee-task-summary">
          <div>
            <CheckCircle2 size={17} />
            <span>{completedTasks} Completed</span>
          </div>

          <div>
            <Clock3 size={17} />
            <span>{pendingTasks} Remaining</span>
          </div>
        </div>

        <div className="employee-task-list">
          {tasks.map((task) => (
            <div className="employee-task-item" key={task.id}>
              <button
                className={`task-check ${
                  task.status === "Completed"
                    ? "task-checked"
                    : ""
                }`}
                onClick={() => handleCompleteTask(task.id)}
                aria-label={`Toggle ${task.title}`}
                title={
                  task.status === "Completed"
                    ? "Mark as pending"
                    : "Complete task and earn points"
                }
              >
                {task.status === "Completed" ? (
                  <CircleCheck size={21} />
                ) : (
                  <Circle size={21} />
                )}
              </button>

              <div className="employee-task-content">
                <strong
                  className={
                    task.status === "Completed"
                      ? "task-title-completed"
                      : ""
                  }
                >
                  {task.title}
                </strong>

                <div className="employee-task-meta">
                  <span>{task.category}</span>
                  <span>•</span>
                  <span>
                    <CalendarDays size={13} />
                    Due {task.dueDate}
                  </span>
                </div>
              </div>

              <div className="task-reward">
                <Zap size={15} />
                +{task.points} pts
              </div>

              <span
                className={`task-status ${
                  task.status === "Completed"
                    ? "status-completed"
                    : "status-pending"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Tracking */}
      <section className="employee-activity-panel dashboard-panel">
        <SectionHeader
          title="My Activities"
          description="Your contributions towards a greener workplace."
          actionLabel="Log Activity"
          actionIcon={PlusIcon}
          onAction={handleAddActivity}
        />

        <div className="activity-filter-bar">
          {[
            "All",
            "Environmental",
            "Social",
            "Governance",
          ].map((filter) => (
            <button
              key={filter}
              className={`task-filter ${
                activeFilter === filter
                  ? "filter-active"
                  : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="employee-activity-list">
          {visibleActivities.map((activity) => (
            <div
              className="employee-activity-item"
              key={activity.id}
            >
              <div className="employee-activity-icon">
                {activity.category === "Environmental" ? (
                  <Leaf size={19} />
                ) : activity.category === "Social" ? (
                  <Heart size={19} />
                ) : (
                  <ShieldCheck size={19} />
                )}
              </div>

              <div className="employee-activity-content">
                <strong>{activity.title}</strong>
                <span>
                  {activity.category} • {activity.date}
                </span>
              </div>

              <div className="activity-points">
                <Zap size={15} />
                +{activity.points} pts
              </div>
            </div>
          ))}

          {visibleActivities.length === 0 && (
            <div className="empty-state">
              <Leaf size={28} />
              <strong>No activities found</strong>
              <p>Try selecting another category.</p>
            </div>
          )}
        </div>

        {filteredActivities.length > 4 && (
          <button
            className="activity-show-more"
            onClick={() =>
              setShowAllActivities(!showAllActivities)
            }
          >
            {showAllActivities ? "Show Less" : "Show More"}
          </button>
        )}
      </section>

      {/* Bottom Grid */}
      <section className="employee-bottom-grid">
        {/* Achievements */}
        <div className="dashboard-panel achievements-panel">
          <SectionHeader
            title="My Achievements"
            description="Milestones you've unlocked on your journey."
          />

          <div className="achievement-grid">
            {employeeAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`achievement-card ${
                  achievement.unlocked
                    ? "achievement-unlocked"
                    : "achievement-locked"
                }`}
              >
                <div className="achievement-icon">
                  {achievement.icon}
                </div>

                <strong>{achievement.title}</strong>

                <p>{achievement.description}</p>

                <span>
                  {achievement.unlocked
                    ? "Unlocked"
                    : "Locked"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="dashboard-panel leaderboard-panel">
          <SectionHeader
            title="Eco Leaderboard"
            description="Celebrate sustainability champions."
            actionLabel={
              showFullLeaderboard ? "Show Less" : "View All"
            }
            onAction={() =>
              setShowFullLeaderboard(!showFullLeaderboard)
            }
          />

          <div className="leaderboard-list">
            {visibleLeaderboard.map((member) => {
              const isCurrentUser =
                member.name === employeeProfile.name;

              return (
                <div
                  key={member.rank}
                  className={`leaderboard-item ${
                    isCurrentUser
                      ? "leaderboard-current-user"
                      : ""
                  }`}
                >
                  <div
                    className={`leaderboard-rank rank-${member.rank}`}
                  >
                    {member.rank <= 3 ? (
                      <Trophy size={16} />
                    ) : (
                      member.rank
                    )}
                  </div>

                  <div className="leaderboard-avatar">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>

                  <div className="leaderboard-member">
                    <strong>
                      {member.name}
                      {isCurrentUser && (
                        <span className="you-badge">You</span>
                      )}
                    </strong>

                    <span>{member.department}</span>
                  </div>

                  <div className="leaderboard-points">
                    <Zap size={14} />
                    {member.points.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="employee-impact-banner">
        <div className="impact-banner-icon">
          <TreePine size={30} />
        </div>

        <div className="impact-banner-content">
          <h3>Your actions matter!</h3>
          <p>
            Through your sustainability activities, you've
            contributed to a greener workplace. Keep going!
          </p>
        </div>

        <div className="impact-banner-stat">
          <Recycle size={22} />
          <strong>42.5 kg</strong>
          <span>Carbon saved</span>
        </div>

        <button
          className="impact-banner-button"
          onClick={() =>
            alert("Demo: Personal impact report coming soon.")
          }
        >
          My Impact
          <ArrowUpRight size={17} />
        </button>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <span>© 2026 EcoSphere ESG Management Platform</span>

        <span>
          Small steps. Big impact.
          <Leaf size={14} />
        </span>
      </footer>
    </div>
  );
};

// Small icon component for the Log Activity button
const PlusIcon = ({ size = 16 }) => (
  <span style={{ fontSize: size, lineHeight: 1 }}>+</span>
);

export default EmployeeDashboard;
