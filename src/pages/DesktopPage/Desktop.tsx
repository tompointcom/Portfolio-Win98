import styles from "./Desktop.module.scss";
import Taskbar from "../../Components/Taskbar/Taskbar";
import DesktopIcon from "../../Components/DesktopIcon/DesktopIcon";
import Win98Window from "../../Components/Win98Window/Win98Window";
import Minesweeper from '../../Components/Minesweeper/Minesweeper';
import InternetExplorer from '../../Components/InternetExplorer/InternetExplorer';

// Import des icônes
import InternetExplorerIcon from "../../assets/icons/InternetExplorerIcon.svg";
import ResumeIcon from "../../assets/icons/pdf.png";
import MinesweeperIcon from "../../assets/icons/MinesweeperIcon.svg";
import HTML5 from "../../assets/icons/html-5.png";
import { useState } from 'react';

function Desktop() {
  const [showMinesweeper, setShowMinesweeper] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showResume, setShowResume] = useState(false);

    const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/courcy_tomCV';
    link.download = 'Tom-Courcy-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className={styles.desktop}>
      <div className={styles.desktop__icons}>
        <DesktopIcon 
          icon={ResumeIcon} 
          label="Resume.pdf"
          onClick={() => {}}
          onDoubleClick={downloadResume}
        />
        <DesktopIcon 
          icon={HTML5} 
          label="My Projects"
          onClick={() => {}}
          onDoubleClick={() => setShowProjects(true)}
        />
        <DesktopIcon 
          icon={MinesweeperIcon} 
          label="Minesweeper"
          onClick={() => {}}
          onDoubleClick={() => setShowMinesweeper(true)}
        />
      </div>
      
      {showMinesweeper && (
        <Win98Window
          title="Minesweeper"
          initialTop={90}
          initialLeft={140}
          onClose={() => setShowMinesweeper(false)}
        >
          <Minesweeper rows={9} cols={9} mines={10} />
        </Win98Window>
      )}

      {showProjects && (
        <Win98Window
          title="Internet Explorer - My Projects"
          icon={InternetExplorerIcon}
          initialTop={60}
          initialLeft={100}
          width={900}
          height={600}
          onClose={() => setShowProjects(false)}
        >
          <InternetExplorer />
        </Win98Window>
      )}

      {showResume && (
        <Win98Window
          title="Adobe Acrobat Reader - Resume.pdf"
          icon={ResumeIcon}
          initialTop={40}
          initialLeft={80}
          width={900}
          height={700}
          onClose={() => setShowResume(false)}
        >
        </Win98Window>
      )}

      <Taskbar />
    </div>
  );
}

export default Desktop;