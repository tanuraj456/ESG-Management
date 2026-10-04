
import { ArrowRight } from "lucide-react";

const SectionHeader = ({
  title,
  description,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = ArrowRight,
  className = "",
}) => {
  return (
    <div className={`section-header ${className}`}>
      <div className="section-header-content">
        <h2>{title}</h2>

        {description && <p>{description}</p>}
      </div>

      {actionLabel && (
        <button
          className="section-action-button"
          onClick={onAction}
          type="button"
        >
          <span>{actionLabel}</span>
          <ActionIcon size={16} />
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
