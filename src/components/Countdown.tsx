import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from './Button';

export const Countdown: ClientComponent = () => {
  const [time, setTime] = useState(0);

  const startTime = useRef(Date.now());

  const raf = useRef(0);

  const reset = useCallback(() => {
    setTime(0);
    raf.current = 0;
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  const pause = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  };

  const animate = () => {
    if (raf.current) return;
    startTime.current = Date.now();
    const _doAnimate = () => {
      const currentTime = Date.now();
      const remains = currentTime - startTime.current;

      if (remains >= 1000) {
        console.log('remains', remains);
        startTime.current = currentTime;
        setTime((pre) => ++pre);
      }

      raf.current = requestAnimationFrame(_doAnimate);
    };

    raf.current = requestAnimationFrame(_doAnimate);
  };

  return (
    <>
      <div className="flex w-full gap-4 py-4">
        <Button
          className="flex w-fit justify-center px-4"
          onClick={() => {
            animate();
          }}
        >
          <span>开始</span>
        </Button>
        <Button
          className="mt-0 flex w-fit justify-center px-4"
          onClick={() => {
            pause();
          }}
        >
          <span>暂停</span>
        </Button>
        <Button
          className="mt-0 flex w-fit justify-center px-4"
          onClick={() => {
            pause();
            reset();
          }}
        >
          <span>重置</span>
        </Button>
      </div>

      {time}
    </>
  );
};
