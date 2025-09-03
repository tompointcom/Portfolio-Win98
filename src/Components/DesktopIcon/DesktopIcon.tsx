import  { useState } from 'react';
import styles from './DesktopIcon.module.scss';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

function DesktopIcon({ icon, label, onClick, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick?.();
  };

  const handleDoubleClick = () => {
    onDoubleClick?.();
  };

  return (
    <div 
      className={`${styles.icon} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <img src={icon} alt={`${label} Icon`} />
      <span>{label}</span>
    </div>
  );
}

export default DesktopIcon;