
import {
    TrendingUp,
    TrendingDown,
    Minus,
  } from "lucide-react";
  
  const StatCard = ({
    title,
    value,
    change,
    changeLabel = "vs last month",
    icon: Icon,
    trend = "up",
    description,
  }) => {
    const isPositive = trend === "up";
    const isNeutral = trend === "neutral";
  
    return (
      <div className="stat-card">
        <div className="stat-card-top">
          <div className="stat-card-icon">
            {Icon && <Icon size={21} strokeWidth={1.8} />}
          </div>
  
          <span
            className={`stat-trend ${
              isNeutral
                ? "trend-neutral"
                : isPositive
                ? "trend-positive"
                : "trend-negative"
            }`}
          >
            {isNeutral ? (
              <Minus size={14} />
            ) : isPositive ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
  
            {change}
          </span>
        </div>
  
        <div className="stat-card-content">
          <p className="stat-card-title">{title}</p>
  
          <h2 className="stat-card-value">{value}</h2>
  
          {description && (
            <p className="stat-card-description">{description}</p>
          )}
        </div>
  
        <div className="stat-card-footer">
          <span>{changeLabel}</span>
        </div>
      </div>
    );
  };
  
  export default StatCard;
  