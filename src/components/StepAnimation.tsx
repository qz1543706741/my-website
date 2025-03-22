import { useEffect, useRef, useState } from 'react';

import { Button } from './Button';

const animateDuration = (
  from: number,
  to: number,
  duration: number,
  onProgress: (v: number) => void,
) => {
  const startTime = Date.now();
  /** 距离 */
  let d = from;
  /** 速度 */
  const v = (to - from) / duration;

  function _run() {
    /** 时间 */
    const t = Date.now() - startTime;
    if (t >= duration) {
      d = to;
      onProgress(d);
      return;
    }
    // 距离 === 速度 * 时间
    d = from + v * t;
    onProgress(d);
    requestAnimationFrame(_run);
  }

  _run();
};

export const StepAnimation: ClientComponent = () => {
  const [time, setTime] = useState(0);

  return (
    <>
      <div className="flex w-full gap-4 py-4">
        <Button
          className="flex w-fit justify-center px-4"
          onClick={() => {
            animateDuration(0, 1000, 1000, (v) => {
              setTime(v);
            });
          }}
        >
          <span>开始</span>
        </Button>
        <StepChooser />
      </div>
      {time}
    </>
  );
};

function StepChooser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<HTMLDivElement>(null);
  const mouseDown = useRef(false);
  const pageX = useRef(0);

  useEffect(() => {
    pageX.current = containerRef.current?.getBoundingClientRect().left || 0;
  }, []);

  const [moveX, setMoveX] = useState(0);

  return (
    <div
      ref={containerRef}
      className="relative flex h-2 w-2xs items-center rounded-sm bg-white"
      onMouseDown={(e) => {
        mouseDown.current = true;
        setMoveX(e.clientX - pageX.current);
      }}
      onMouseMove={(e) => {
        if (mouseDown.current) {
          setMoveX(
            Math.max(
              0,
              Math.min(
                e.clientX - pageX.current,
                Number(containerRef.current?.clientWidth) -
                  Number(posRef.current?.clientWidth),
              ),
            ),
          );
        }
      }}
      onMouseUp={() => {
        console.log('鼠标抬起');
        mouseDown.current = false;
      }}
    >
      <div
        ref={posRef}
        className="absolute left-0 aspect-square h-4 rounded-full bg-[#165DFF] hover:cursor-pointer"
        style={{
          transform: `translateX(${moveX}px)`,
        }}
      />
    </div>
  );
}
