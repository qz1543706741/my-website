import type {
  ComponentProps,
  CSSProperties,
  FunctionComponent,
  HTMLProps,
} from 'react';

global {
  export type PropsWithClassName<P = unknown> = P & {
    className?: HTMLProps<HTMLElement>['className'];
  };

  export type PropsWithStyle<P = unknown> = P & {
    style?: CSSProperties;
  };

  export type PropsWithCustomStyle<P = unknown> = P & {
    className?: HTMLProps<HTMLElement>['className'];
    style?: CSSProperties;
  };

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
