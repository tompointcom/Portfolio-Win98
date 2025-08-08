import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Minesweeper.module.scss';
import faceNeutral from '../../assets/minesweeper/face.png';
import faceLost from '../../assets/minesweeper/face-lost.png';
import faceWon from '../../assets/minesweeper/face-won.png';
import faceActive from '../../assets/minesweeper/face-active.png';
import cellCovered from '../../assets/minesweeper/cell-covered.png';
import cellFlagged from '../../assets/minesweeper/cell-flagged.png';
import cellUncovered from '../../assets/minesweeper/cell-uncovered.png';
import cell1 from '../../assets/minesweeper/cell1.png';
import cell2 from '../../assets/minesweeper/cell2.png';
import cell3 from '../../assets/minesweeper/cell3.png';
import cell4 from '../../assets/minesweeper/cell4.png';
import mineExploded from '../../assets/minesweeper/mine-exploded.png';

import LedCounter from './LedCounter';


type Cell = {
  hasMine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

interface Props {
  rows?: number;
  cols?: number;
  mines?: number;
}

function createBoard(rows: number, cols: number, mines: number): Cell[][] {
  const board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ hasMine: false, revealed: false, flagged: false, adjacent: 0 }))
  );

  // place mines
  const total = rows * cols;
  const mineIdxs = new Set<number>();
  while (mineIdxs.size < mines) {
    mineIdxs.add(Math.floor(Math.random() * total));
  }
  for (const idx of mineIdxs) {
    const r = Math.floor(idx / cols), c = idx % cols;
    board[r][c].hasMine = true;
  }

  // compute adjacency
  const dirs = [-1,0,1];
  for (let r=0;r<rows;r++) for (let c=0;c<cols;c++) {
    if (board[r][c].hasMine) continue;
    let count = 0;
    for (const dr of dirs) for (const dc of dirs) {
      if (dr===0 && dc===0) continue;
      const nr=r+dr, nc=c+dc;
      if (nr>=0&&nr<rows&&nc>=0&&nc<cols && board[nr][nc].hasMine) count++;
    }
    board[r][c].adjacent = count;
  }

  return board;
}

export default function Minesweeper({ rows = 9, cols = 9, mines = 10 }: Props) {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard(rows, cols, mines));
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState<null | 'lost' | 'won'>(null);
  const [flags, setFlags] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  const [facePressed, setFacePressed] = useState(false);


  useEffect(() => {
    if (started && !gameOver) {
      timerRef.current = window.setInterval(() => setSeconds(s => Math.min(999, s + 1)), 1000);
      return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
    }
  }, [started, gameOver]);

  useEffect(() => {
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, []);

  const remaining = useMemo(() => Math.max(0, mines - flags), [mines, flags]);

  const reset = () => {
    // stoppe le timer courant
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // recrée un terrain neuf
    setBoard(createBoard(rows, cols, mines));
    setStarted(false);
    setGameOver(null);
    setFlags(0);
    setSeconds(0);
    setFacePressed(false);
  };

    const faceSrc =
    gameOver === 'lost' ? faceLost :
    gameOver === 'won'  ? faceWon  :
    facePressed ? faceActive : faceNeutral;

  const reveal = (r: number, c: number) => {
    if (gameOver) return;
    setStarted(true);
    setBoard(prev => {
      const b = prev.map(row => row.map(cell => ({ ...cell })));
      const cell = b[r][c];
      if (cell.revealed || cell.flagged) return prev;
      cell.revealed = true;

      if (cell.hasMine) {
        // reveal all mines
        for (let i=0;i<b.length;i++) for (let j=0;j<b[0].length;j++) {
          if (b[i][j].hasMine) b[i][j].revealed = true;
        }
        setGameOver('lost');
        return b;
      }

      // flood fill zeros
      if (cell.adjacent === 0) {
        const q: [number, number][] = [[r, c]];
        while (q.length) {
          const [rr, cc] = q.shift()!;
          for (let dr=-1; dr<=1; dr++) for (let dc=-1; dc<=1; dc++) {
            if (dr===0 && dc===0) continue;
            const nr = rr + dr, nc = cc + dc;
            if (nr<0||nr>=rows||nc<0||nc>=cols) continue;
            const ncell = b[nr][nc];
            if (!ncell.revealed && !ncell.flagged && !ncell.hasMine) {
              ncell.revealed = true;
              if (ncell.adjacent === 0) q.push([nr, nc]);
            }
          }
        }
      }

      // win check
      const unrevealed = b.flat().filter(c => !c.revealed).length;
      if (unrevealed === mines) {
        setGameOver('won');
        b.flat().forEach(c => { if (c.hasMine) c.flagged = true; });
        setFlags(mines);
      }
      return b;
    });
  };

  const toggleFlag = (r: number, c: number) => {
    if (gameOver) return;
    setStarted(true);
    setBoard(prev => {
      const b = prev.map(row => row.map(cell => ({ ...cell })));
      const cell = b[r][c];
      if (cell.revealed) return prev;
      cell.flagged = !cell.flagged;
      setFlags(f => f + (cell.flagged ? 1 : -1));
      return b;
    });
  };

return (
  <div className={styles.wrapper} onContextMenu={(e) => e.preventDefault()} role="application" aria-label="Minesweeper">
    <div className={styles.topBar}>
      <div className={styles.counter}><LedCounter value={remaining} /></div>

        <button
          className={styles.face}
          onClick={reset}
          onMouseDown={() => setFacePressed(true)}
          onMouseUp={() => setFacePressed(false)}
          onMouseLeave={() => setFacePressed(false)}
          aria-label="Reset"
        >
          <img src={faceSrc} alt="Reset" />
        </button>

      <div className={styles.counter}><LedCounter value={seconds} /></div>
    </div>

    <div className={styles.boardFrame}>
      <div className={styles.board} style={{ gridTemplateColumns: `repeat(${cols}, var(--cell-size))` }}>
        {board.map((row, r) =>
          row.map((cell, c) => {
            // Choix du sprite selon l'état
            const spriteByAdj = [undefined, cell1, cell2, cell3, cell4] as const;

            let bg: string | undefined;
            if (!cell.revealed) {
              bg = cell.flagged ? cellFlagged : cellCovered;
            } else if (cell.hasMine) {
              bg = mineExploded; // sprite fourni pour les mines révélées
            } else if (cell.adjacent === 0) {
              bg = cellUncovered;
            } else if (cell.adjacent <= 4) {
              bg = spriteByAdj[cell.adjacent]!;
            } else {
              // 5–8: pas d’images fournies -> on affiche le nombre par-dessus la tuile "uncovered"
              bg = cellUncovered;
            }

            return (
              <button
                key={`${r}-${c}`}
                className={[
                  styles.cell,
                  cell.revealed ? styles.revealed : '',
                  cell.flagged ? styles.flagged : '',
                  gameOver && cell.hasMine ? styles.mine : '',
                ].join(' ')}
                style={{ backgroundImage: `url(${bg})` }}
                onClick={() => reveal(r, c)}
                onContextMenu={(e) => { e.preventDefault(); toggleFlag(r, c); }}
              >
                {cell.revealed && !cell.hasMine && cell.adjacent > 4 ? (
                  <span className={styles[`n${cell.adjacent}`]}>{cell.adjacent}</span>
                ) : null}
              </button>
            );
          })
        )}
      </div>
    </div>
  </div>
);
}