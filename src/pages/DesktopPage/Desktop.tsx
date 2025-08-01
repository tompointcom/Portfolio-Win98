import styles from "./Desktop.module.scss";
import Taskbar from "../../Components/Taskbar/Taskbar";
import MyComputerIcon from "../../assets/icons/MyComputerIcon.svg";
import 
function Desktop() {
  return (
    <div className={styles.desktop}>
      <div className={styles.desktop__icons}>
        <div className={styles.MyComputerIcon}>
          <img src={MyComputerIcon} alt="My Computer Icon" />
          <span>My Computer</span>
        </div>

      </div>
      <Taskbar />
    </div>
  );
}

export default Desktop;