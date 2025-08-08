import styles from '../Minesweeper/Minesweeper.module.scss';

// Imports des chiffres 0–9 (PNG 7‑segments)
import d0 from '../../assets/minesweeper/digits/0.png';
import d1 from '../../assets/minesweeper/digits/1.png';
import d2 from '../../assets/minesweeper/digits/2.png';
import d3 from '../../assets/minesweeper/digits/3.png';
import d4 from '../../assets/minesweeper/digits/4.png';
import d5 from '../../assets/minesweeper/digits/5.png';
import d6 from '../../assets/minesweeper/digits/6.png';
import d7 from '../../assets/minesweeper/digits/7.png';
import d8 from '../../assets/minesweeper/digits/8.png';
import d9 from '../../assets/minesweeper/digits/9.png';

const DIGITS = [d0,d1,d2,d3,d4,d5,d6,d7,d8,d9];

export default function LedCounter({ value }: { value: number }) {
  const v = Math.max(0, Math.min(999, Math.floor(value)));
  const text = String(v).padStart(3, '0');
  return (
    <div className={styles.counterInner} aria-label={`counter ${v}`}>
      {text.split('').map((ch, i) => (
        <img key={i} src={DIGITS[Number(ch)]} alt={ch} />
      ))}
    </div>
  );
}