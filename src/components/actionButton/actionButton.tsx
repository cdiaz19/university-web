import React from "react";
import { Tooltip } from 'react-tooltip';

interface ActionButtonProps {
  tooltip: string;
  onClick: () => void;
  icon: React.ReactNode;
  colorClass: string;
}

const ActionButton = ({ tooltip, onClick, icon, colorClass }: ActionButtonProps) => (
  <>
    <button
      data-tooltip-id={tooltip}
      data-tooltip-content={tooltip}
      onClick={onClick}
      className={`${colorClass} hover:scale-105 transition-transform flex items-center`}
    >
      {icon}
    </button>
    <Tooltip id={tooltip} />
  </>
);

export default ActionButton;
