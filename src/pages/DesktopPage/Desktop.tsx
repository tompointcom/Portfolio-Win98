import styles from "./Desktop.module.scss";
import Taskbar from "../../Components/Taskbar/Taskbar";
import MyComputerIcon from "../../assets/icons/MyComputerIcon.svg";
import MyDocumentsIcon from "../../assets/icons/MyDocumentsIcon.svg";
import InternetExplorerIcon from "../../assets/icons/InternetExplorerIcon.svg";
import OutlookExpressIcon from "../../assets/icons/OutlookExpressIcon.svg";
import RecycleBinIcon from "../../assets/icons/RecycleBinIcon.svg";
import MinesweeperIcon from "../../assets/icons/MinesweeperIcon.svg";
import DirIcon from "../../assets/icons/DirIcon.svg";

function Desktop() {
  return (
    <div className={styles.desktop}>
      <div className={styles.desktop__icons}>
        <div className={styles.Icon}>
          <img src={MyComputerIcon} alt="My Computer Icon" />
          <span>My Computer</span>
        </div>
        <div className={styles.Icon}>
          <img src={MyDocumentsIcon} alt="My Documents Icon" />
          <span>My Documents</span>
        </div>
        <div className={styles.Icon}>
          <img src={InternetExplorerIcon} alt="Internet Explorer Icon" />
          <span>Internet Explorer</span>
        </div>
        <div className={styles.Icon}>
          <img src={RecycleBinIcon} alt="Recycle Bin Icon" />
          <span>Recycle Bin</span>
        </div>
        <div className={styles.Icon}>
          <img src={OutlookExpressIcon} alt="Outlook Express Icon" />
          <span>Outlook Express</span>
        </div>
        <div className={styles.Icon}>
          <img src={MinesweeperIcon} alt="Minesweeper Icon" />
          <span>Minesweeper</span>    
        </div>
        <div className={styles.Icon}>
          <img src={DirIcon} alt="Directory Icon" />  
          <span>My Resume</span>
        </div>
        <div className={styles.Icon}>
          <img src={DirIcon} alt="Directory Icon" />
          <span>My Projects</span>
        </div>
      </div>
      <Taskbar />
    </div>
  );
}

export default Desktop;