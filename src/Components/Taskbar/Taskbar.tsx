import styles from './Taskbar.module.scss';
import windowsLogo from '../../assets/taskbar-elements/StartButton.svg';
import taskbarElements from '../../assets/taskbar-elements/TaskbarElements.svg';

function Taskbar() {
  return (
    <div className={styles.taskbar}>
      <div className={styles.startButton}>
        <img className={styles.logo} src={windowsLogo} alt="Logo Windows" />
      </div>
      <div className={styles.taskIcons}>
        <img className={styles.elements} src={taskbarElements} alt="Taskbar styling bars" />
      </div>
      <div className={styles.systemTray}>
      </div>
    </div>
  );
}

export default Taskbar;