import clsx from 'clsx';
import { motion, type MotionProps } from 'motion/react';
import type { FC, MouseEventHandler, PropsWithChildren } from 'react';

export type ButtonProps = PropsWithClassName<{
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}> &
  MotionProps;

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  onClick,
  className,
  ...motionProps
}) => {
  return (
    <motion.div
      style={{
        margin: '0',
      }}
      className={clsx(
        'animate-scale flex h-12 w-[21rem] cursor-pointer items-center justify-center rounded-2xl bg-[#165DFF] text-white transition-all active:opacity-80',
        className,
        disabled ? 'pointer-events-none opacity-70' : '',
      )}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
