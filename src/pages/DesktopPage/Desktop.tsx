import styles from "./Desktop.module.scss";
import Taskbar from "../../Components/Taskbar/Taskbar";
import DesktopIcon from "../../Components/DesktopIcon/DesktopIcon";

// Import des icônes
import MyComputerIcon from "../../assets/icons/MyComputerIcon.svg";
import MyDocumentsIcon from "../../assets/icons/MyDocumentsIcon.svg";
import InternetExplorerIcon from "../../assets/icons/InternetExplorerIcon.svg";
import OutlookExpressIcon from "../../assets/icons/OutlookExpressIcon.svg";
import RecycleBinIcon from "../../assets/icons/RecycleBinIcon.svg";
import MinesweeperIcon from "../../assets/icons/MinesweeperIcon.svg";
import DirIcon from "../../assets/icons/DirIcon.svg";

function Desktop() {
  const handleIconClick = (iconName: string) => {
    console.log(`Clicked on ${iconName}`);
  };

  const handleIconDoubleClick = (iconName: string) => {
    console.log(`Double-clicked on ${iconName}`);
    // Ici vous pouvez ouvrir des fenêtres, naviguer, etc.
  };

  return (
    <div className={styles.desktop}>
      <div className={styles.desktop__icons}>
        <DesktopIcon 
          icon={MyComputerIcon} 
          label="My Computer"
          onClick={() => handleIconClick("My Computer")}
          onDoubleClick={() => handleIconDoubleClick("My Computer")}
        />
        <DesktopIcon 
          icon={MyDocumentsIcon} 
          label="My Documents"
          onClick={() => handleIconClick("My Documents")}
          onDoubleClick={() => handleIconDoubleClick("My Documents")}
        />
        <DesktopIcon 
          icon={InternetExplorerIcon} 
          label="Internet Explorer"
          onClick={() => handleIconClick("Internet Explorer")}
          onDoubleClick={() => handleIconDoubleClick("Internet Explorer")}
        />
        <DesktopIcon 
          icon={RecycleBinIcon} 
          label="Recycle Bin"
          onClick={() => handleIconClick("Recycle Bin")}
          onDoubleClick={() => handleIconDoubleClick("Recycle Bin")}
        />
        <DesktopIcon 
          icon={OutlookExpressIcon} 
          label="Outlook Express"
          onClick={() => handleIconClick("Outlook Express")}
          onDoubleClick={() => handleIconDoubleClick("Outlook Express")}
        />
        <DesktopIcon 
          icon={MinesweeperIcon} 
          label="Minesweeper"
          onClick={() => handleIconClick("Minesweeper")}
          onDoubleClick={() => handleIconDoubleClick("Minesweeper")}
        />
        <DesktopIcon 
          icon={DirIcon} 
          label="My Resume"
          onClick={() => handleIconClick("My Resume")}
          onDoubleClick={() => handleIconDoubleClick("My Resume")}
        />
        <DesktopIcon 
          icon={DirIcon} 
          label="My Projects"
          onClick={() => handleIconClick("My Projects")}
          onDoubleClick={() => handleIconDoubleClick("My Projects")}
        />
      </div>
      <Taskbar />
    </div>
  );
}

export default Desktop;