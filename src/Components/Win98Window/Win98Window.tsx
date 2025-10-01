import { useRef, useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import styles from './Win98Window.module.scss';

interface Win98WindowProps {
  title: string;
  icon?: string;
  initialTop?: number;
  initialLeft?: number;
  width?: number;
  height?: number;
  onClose?: () => void;
  onMinimize?: () => void;
}

export default function Win98Window({
  title,
  icon,
  initialTop = 80,
  initialLeft = 120,
  width,
  height,
  onClose,
  onMinimize,
  children
}: PropsWithChildren<Win98WindowProps>) {
  const winRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: initialTop, left: initialLeft });
  const [drag, setDrag] = useState<{x:number;y:number}|null>(null);
  const style: React.CSSProperties = { top: pos.top, left: pos.left };
  if (typeof width !== 'undefined') style.width = width;
  if (typeof height !== 'undefined') style.height = height;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag || !winRef.current || !winRef.current.parentElement) return;
      e.preventDefault();
      const winEl = winRef.current;
      const parent = winEl.parentElement as HTMLElement;

      const cs = getComputedStyle(parent);
      const taskbarH = parseFloat(cs.getPropertyValue('--taskbar-height')) || 0;

      setPos(p => {
        const next = { top: p.top + e.movementY, left: p.left + e.movementX };
        const availableHeight = parent.clientHeight - taskbarH;
        const maxLeft = Math.max(0, parent.clientWidth  - winEl.offsetWidth);
        const maxTop  = Math.max(0, availableHeight      - winEl.offsetHeight);
        return {
          top: Math.min(Math.max(next.top, 0), maxTop),
          left: Math.min(Math.max(next.left, 0), maxLeft),
        };
      });
    };
    const onUp = () => setDrag(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [drag]);

  return (
    <div
      ref={winRef}
      className={styles.window}
      style={style}
    >
      <div
        className={styles.titleBar}
        onMouseDown={(e) => { if (e.button === 0) { e.preventDefault(); setDrag({x:e.clientX,y:e.clientY}); } }}
      >
        <div className={styles.title}>
          {icon ? (
            <img src={icon} alt="" className={styles.iconSquare} />
          ) : (
            <span className={styles.iconSquare} />
          )}
          {title}
        </div>
        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${styles.btnMin}`}
            aria-label="Minimize"
            onClick={onMinimize}
            title="Minimize"
          ></button>
          <button
            className={`${styles.btn} ${styles.btnClose}`}
            aria-label="Close"
            onClick={onClose}
            title="Close"
          ></button>
        </div>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
}