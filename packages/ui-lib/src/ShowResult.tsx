import { useState } from 'react';

import Close from '@/assets/close.svg?react';

import { Button } from './Button';

export const ShowResult: ClientComponent<{
  defaultShow?: boolean;
  result: string;
}> = ({ defaultShow, result }) => {
  const [show, setShow] = useState(Boolean(defaultShow));

  return (
    <div className="pt-4">
      {show ? (
        <div className="relative overflow-hidden rounded-3xl bg-transparent p-3.5 whitespace-pre-wrap shadow-[0px_2px_50px_0px_#0000001a] transition-all outline-none">
          {result}
          <Close
            className="absolute top-3.5 right-3.5 aspect-square w-6 cursor-pointer"
            onClick={() => {
              setShow(false);
            }}
          />
        </div>
      ) : (
        <Button
          className="w-fit px-4"
          onClick={() => {
            setShow(true);
          }}
        >
          点击显示答案
        </Button>
      )}
    </div>
  );
};
