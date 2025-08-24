import { useState, useEffect } from 'react';
import styles from './Taskbar.module.scss';
import windowsLogo from '../../assets/taskbar-elements/StartButton.svg';
// import taskbarElements from '../../assets/taskbar-elements/TaskbarStylingElements.svg';
import Calendar from '../../assets/taskbar-elements/Calendar.svg';
import Sound from '../../assets/taskbar-elements/Sound.svg';
import InternetExplorer from '../../assets/taskbar-elements/InternetExplorerIcon.svg';
import LetterIcon from '../../assets/taskbar-elements/LetterIcon.svg';
import PaintIcon from '../../assets/taskbar-elements/PaintIcon.svg';
import SateliteIcone  from '../../assets/taskbar-elements/SateliteIcon.svg';

function Taskbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    
    return `${hours}:${minutes}${ampm}`;
  };

  return (
    <div className={styles.taskbar}>
      <div className={styles.startButton}>
        <img className={styles.logo} src={windowsLogo} alt="Logo Windows" />
      </div>
      <div className={styles.taskIcons}>
        {/* <img className={styles.elements} src={taskbarElements} alt="Taskbar styling bars" /> */}
        <img className={styles.icon} src={InternetExplorer} alt="Internet Explorer" />
        <img className={styles.icon} src={LetterIcon} alt="Letter Icon" />
        <img className={styles.icon} src={PaintIcon} alt="Paint Icon" />
        <img className={styles.icon} src={SateliteIcone} alt="Satellite Icon" />
        {/* <img className={styles.elements} src={taskbarElements} alt="Taskbar styling bars" /> */}
      </div>
      <div className={styles.taskbarElements}>
      </div>
      <div className={styles.systemTray}>
        <img className={styles.calendar} src={Calendar} alt="Calendar" />
        <img className={styles.sound} src={Sound} alt="Sound" />
        <div className={styles.clock}>
          <div className={styles.time}>
            {formatTime(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Taskbar;