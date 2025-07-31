import styles from "./Desktop.module.scss";
import Taskbar from "../../Components/Taskbar/Taskbar";

function Desktop() {
  return (
    <div className={styles.desktop}>
      <Taskbar />
    </div>
  );
}

export default Desktop;