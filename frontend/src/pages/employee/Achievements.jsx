
import React, { useMemo, useState } from "react";

const initialAchievements = [
  {
    id: 1,
    title: "Green Starter",
    description: "Complete your first environmental activity.",
    category: "Environmental",
    icon: "🌱",
    points: 50,
    earned: true,
    earnedDate: "September 12, 2026",
    progress: 100,
    requirement: "Complete 1 environmental activity",
    rarity: "Common",
  },
  {
    id: 2,
    title: "Eco Champion",
    description: "Complete five environmental activities.",
    category: "Environmental",
    icon: "🌳",
    points: 150,
    earned: true,
    earnedDate: "September 20, 2026",
    progress: 100,
    requirement: "Complete 5 environmental activities",
    rarity: "Rare",
  },
  {
    id: 3,
    title: "Community Hero",
    description: "Make a meaningful contribution to your community.",
    category: "Social",
    icon: "🤝",
    points: 100,
    earned: true,
    earnedDate: "September 25, 2026",
    progress: 100,
    requirement: "Complete 3 social responsibility activities",
    rarity: "Rare",
  },
  {
    id: 4,
    title: "Learning Enthusiast",
    description: "Complete five ESG learning resources.",
    category: "Governance",
    icon: "📚",
    points: 75,
    earned: false,
    earnedDate: null,
    progress: 80,
    requirement: "Complete 5 ESG learning resources",
    rarity: "Common",
  },
  {
    id: 5,
    title: "Sustainability Star",
    description: "Earn 500 ESG points through your contributions.",
    category: "Overall",
    icon: "⭐",
    points: 200,
    earned: false,
    earnedDate: null,
    progress: 65,
    requirement: "Earn 500 ESG points",
    rarity: "Epic",
  },
  {
    id: 6,
    title: "Impact Leader",
    description: "Reach the top 10 in the employee impact ranking.",
    category: "Overall",
    icon: "🏅",
    points: 250,
    earned: false,
    earnedDate: null,
    progress: 80,
    requirement: "Reach the top 10 employee impact ranking",
    rarity: "Epic",
  },
  {
    id: 7,
    title: "Planet Protector",
    description: "Complete ten environmental initiatives.",
    category: "Environmental",
    icon: "🌍",
    points: 300,
    earned: false,
    earnedDate: null,
    progress: 40,
    requirement: "Complete 10 environmental activities",
    rarity: "Legendary",
  },
  {
    id: 8,
    title: "ESG Ambassador",
    description: "Become a champion of sustainability awareness.",
    category: "Governance",
    icon: "🎖️",
    points: 350,
    earned: false,
    earnedDate: null,
    progress: 25,
    requirement: "Complete all ESG ambassador milestones",
    rarity: "Legendary",
  },
];

const achievementFilters = [
  "All",
  "Earned",
  "In Progress",
  "Locked",
];

function Achievements() {
  const [achievements] = useState(initialAchievements);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const earnedAchievements = achievements.filter(
    (item) => item.earned
  );

  const totalPoints = earnedAchievements.reduce(
    (sum, item) => sum + item.points,
    0
  );

  const filteredAchievements = useMemo(() => {
    if (activeFilter === "Earned") {
      return achievements.filter((item) => item.earned);
    }

    if (activeFilter === "In Progress") {
      return achievements.filter(
        (item) => !item.earned && item.progress > 0
      );
    }

    if (activeFilter === "Locked") {
      return achievements.filter(
        (item) => !item.earned && item.progress === 0
      );
    }

    return achievements;
  }, [achievements, activeFilter]);

  return (
    <div className="employee-achievements-page">
      {/* Header */}
      <div className="achievements-header">
        <div>
          <p className="eyebrow">
            EMPLOYEE WORKSPACE / ACHIEVEMENTS
          </p>
          <h1>My Achievements</h1>
          <p className="achievements-subtitle">
            Celebrate your progress and keep making a difference.
          </p>
        </div>

        <div className="achievements-header-icon">🏆</div>
      </div>

      {/* Summary */}
      <div className="achievements-summary">
        <div className="achievement-summary-card">
          <div className="achievement-summary-icon gold">🏆</div>
          <div>
            <p>Badges Earned</p>
            <h2>
              {earnedAchievements.length}
              <small> / {achievements.length}</small>
            </h2>
            <span>Achievements unlocked</span>
          </div>
        </div>

        <div className="achievement-summary-card">
          <div className="achievement-summary-icon green">⭐</div>
          <div>
            <p>Reward Points</p>
            <h2>{totalPoints}</h2>
            <span>Points from earned badges</span>
          </div>
        </div>

        <div className="achievement-summary-card">
          <div className="achievement-summary-icon blue">🎯</div>
          <div>
            <p>Completion Rate</p>
            <h2>
              {Math.round(
                (earnedAchievements.length / achievements.length) * 100
              )}%
            </h2>
            <span>Overall achievement progress</span>
          </div>
        </div>
      </div>

      {/* Featured achievement */}
      <div className="featured-achievement">
        <div className="featured-achievement-content">
          <span className="featured-label">FEATURED ACHIEVEMENT</span>
          <h2>Keep Growing, Keep Glowing!</h2>
          <p>
            Every sustainability action brings you closer to your
            next milestone. Continue your journey and unlock more
            achievements.
          </p>

          <div className="featured-progress">
            <div className="featured-progress-heading">
              <span>Next milestone</span>
              <strong>80%</strong>
            </div>
            <div className="featured-progress-track">
              <div
                className="featured-progress-fill"
                style={{ width: "80%" }}
              />
            </div>
            <span className="featured-progress-caption">
              Just a little more to unlock your next badge!
            </span>
          </div>
        </div>

        <div className="featured-trophy">🏆</div>
      </div>

      {/* Filters */}
      <div className="achievements-section-heading">
        <div>
          <h2>Achievement Collection</h2>
          <p>Explore your earned and upcoming badges</p>
        </div>
      </div>

      <div className="achievement-filter-tabs">
        {achievementFilters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "active" : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
            {filter === "Earned" && (
              <span>{earnedAchievements.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      {filteredAchievements.length > 0 ? (
        <div className="achievements-grid">
          {filteredAchievements.map((achievement) => (
            <article
              className={`achievement-card ${
                achievement.earned ? "earned" : "unearned"
              }`}
              key={achievement.id}
            >
              <div className="achievement-card-top">
                <span
                  className={`achievement-rarity ${achievement.rarity.toLowerCase()}`}
                >
                  {achievement.rarity}
                </span>

                {achievement.earned ? (
                  <span className="achievement-earned-check">✓</span>
                ) : (
                  <span className="achievement-lock">🔒</span>
                )}
              </div>

              <div className="achievement-badge">
                {achievement.icon}
              </div>

              <h3>{achievement.title}</h3>
              <p className="achievement-description">
                {achievement.description}
              </p>

              <div className="achievement-card-points">
                <span>⭐</span> +{achievement.points} points
              </div>

              {!achievement.earned && (
                <div className="achievement-progress">
                  <div className="achievement-progress-heading">
                    <span>Progress</span>
                    <strong>{achievement.progress}%</strong>
                  </div>

                  <div className="achievement-progress-track">
                    <div
                      className="achievement-progress-fill"
                      style={{
                        width: `${achievement.progress}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {achievement.earned && (
                <div className="achievement-earned-date">
                  ✓ Earned on {achievement.earnedDate}
                </div>
              )}

              <button
                className="achievement-details-btn"
                onClick={() =>
                  setSelectedAchievement(achievement)
                }
              >
                View Details →
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="achievement-empty">
          <div>🏅</div>
          <h3>No achievements found</h3>
          <p>Try selecting another filter.</p>
        </div>
      )}

      {/* Details modal */}
      {selectedAchievement && (
        <div
          className="achievement-modal-overlay"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="achievement-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="achievement-modal-close"
              onClick={() => setSelectedAchievement(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="achievement-modal-badge">
              {selectedAchievement.icon}
            </div>

            <span
              className={`achievement-rarity ${selectedAchievement.rarity.toLowerCase()}`}
            >
              {selectedAchievement.rarity}
            </span>

            <h2>{selectedAchievement.title}</h2>
            <p>{selectedAchievement.description}</p>

            <div className="achievement-modal-info">
              <div>
                <span>Category</span>
                <strong>{selectedAchievement.category}</strong>
              </div>

              <div>
                <span>Reward</span>
                <strong>
                  +{selectedAchievement.points} points
                </strong>
              </div>

              <div>
                <span>Requirement</span>
                <strong>{selectedAchievement.requirement}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedAchievement.earned
                    ? "Earned"
                    : "In Progress"}
                </strong>
              </div>
            </div>

            {!selectedAchievement.earned && (
              <div className="achievement-modal-progress">
                <div className="achievement-progress-heading">
                  <span>Your progress</span>
                  <strong>
                    {selectedAchievement.progress}%
                  </strong>
                </div>

                <div className="achievement-progress-track">
                  <div
                    className="achievement-progress-fill"
                    style={{
                      width: `${selectedAchievement.progress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <button
              className="achievement-modal-action"
              onClick={() => setSelectedAchievement(null)}
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Achievements;
