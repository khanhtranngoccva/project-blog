"use client";

import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import {motion} from "framer-motion";

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const selectedColor = COLORS[timeElapsed % COLORS.length];
  const id = React.useId();

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function resetTimer() {
    setIsPlaying(false);
    setTimeElapsed(0);
  }

  React.useEffect(() => {
    if (isPlaying) {
      const interval = window.setInterval(() => {
        setTimeElapsed(current => current + 1);
      }, 1000);

      return () => {
        window.clearInterval(interval);
      }
    }
  }, [isPlaying]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  className={
                    styles.selectedColorOutline
                  }
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 70,
                  }}
                  layoutId={`${id}-outline`}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {isPlaying ? <button onClick={togglePlay}>
            <Pause />
            <VisuallyHidden>Pause</VisuallyHidden>
          </button> : <button onClick={togglePlay}>
            <Play />
            <VisuallyHidden>Play</VisuallyHidden>
          </button>}
          <button onClick={resetTimer}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
