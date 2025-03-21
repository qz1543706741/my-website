import { useEffect, useRef, useState } from 'react';

import { Button } from './Button';

export const Flip: ClientComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [list, setList] = useState([
    'Javascript',
    'TypeScript',
    'Java',
    'Python',
    'Go',
    'C',
    'C++',
  ]);

  const cacheTop = useRef<WeakMap<HTMLDivElement, number>>(new WeakMap());

  useEffect(() => {
    if (!ref.current?.children) return;

    for (const child of ref.current.children) {
      const divEl = child as HTMLDivElement;
      if (!cacheTop.current.has(divEl)) return;
      const dist =
        cacheTop.current.get(child as HTMLDivElement)! -
        (child as HTMLDivElement).getBoundingClientRect().top;
      divEl.style.transition = '';
      divEl.style.transform = `translateY(${dist}px)`;

      requestAnimationFrame(() => {
        divEl.style.transition = 'transform 300ms ease-in-out';
        divEl.style.transform = `translateY(0px)`;
      });

      // divEl.animate(
      //   [
      //     { transform: `translateY(${dist}px)` },
      //     {
      //       transform: `translateY(0)`,
      //     },
      //   ],
      //   {
      //     duration: 200,
      //     easing: 'ease-in-out',
      //   },
      // );
    }
  }, [list]);

  return (
    <div className="pt-4">
      <Button
        className="my-2 flex w-fit justify-center px-4"
        onClick={() => {
          ref.current?.childNodes.forEach((child) => {
            const { top } = (child as HTMLDivElement).getBoundingClientRect();
            cacheTop.current.set(child as HTMLDivElement, top);
          });
          setList((rawList) => {
            const temp = [...rawList];
            for (let i = temp.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            return temp;
          });
        }}
      >
        开始动画
      </Button>
      <div ref={ref}>
        {list.map((text) => {
          return (
            <div
              key={text}
              className="mb-2 flex h-8 w-full items-center justify-center rounded-xs bg-amber-300 text-black"
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
