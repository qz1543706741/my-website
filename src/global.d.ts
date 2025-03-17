import type {
  ComponentProps,
  CSSProperties,
  FunctionComponent,
  HTMLProps,
} from 'react';

import type { AstroClientDirectives } from '../node_modules/astro/dist/types/public/elements';

global {
  export type PropsWithClass<P = object> = {
    className?: HTMLProps<HTMLElement>['className'];
    style?: CSSProperties;
  } & P;

  export type ClientComponent<P = object> = FunctionComponent<
    AstroClientDirectives & PropsWithClass<P>
  >;

  export type DEPLOY_ENVIRONMENT = 'development' | 'production' | 'preview';

  export type GetFunctionComponentProps<T> =
    T extends FunctionComponent<infer R> ? R : void;

  declare module '*.svg' {
    const ReactComponent: FunctionComponent<
      ComponentProps<'svg'> & {
        title?: string;
        titleId?: string;
        desc?: string;
        descId?: string;
      }
    >;
    export default ReactComponent;
  }
}

export {};
