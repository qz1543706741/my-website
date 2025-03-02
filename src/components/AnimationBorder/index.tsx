'use client';

import clsx from 'clsx';
import {
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useRef,
} from 'react';

import styles from './style.module.css';

export type AnimationBorderProps = {
  borderSize: string;
  borderRadius: string;
  paused: boolean;
  duration: string;
  whilePausedShow?: boolean;
};

export const AnimationBorder: FC<
  PropsWithClassName<PropsWithChildren<AnimationBorderProps>>
> = ({
  borderSize,
  borderRadius,
  className,
  children,
  duration,
  paused,
  whilePausedShow = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    const el = containerRef.current;
    if (!el) return;

    el.style.setProperty('--border-radius', borderRadius);
    el.style.setProperty('--border-size', borderSize);
    el.style.setProperty('--duration', duration);

    requestAnimationFrame(() => {
      const scale = Math.ceil(el.clientWidth / el.clientHeight);
      el.style.setProperty('--height-scale', scale.toString());
    });
  }, [borderRadius, borderSize, duration]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.style.setProperty(
      '--border-opacity',
      paused ? (whilePausedShow ? '1' : '0') : '1',
    );
  }, [paused, whilePausedShow]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        className,
        styles['animation-border-container'],
        styles.animation,
      )}
      style={{
        animationPlayState: paused ? 'paused' : 'running',
      }}
    >
      {children}
    </div>
  );
};
