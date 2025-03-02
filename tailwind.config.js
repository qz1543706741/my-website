import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const EXTEND_COLORS = {
  'blue-primary': '#0D84FF',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['MiSans', 'system-ui', 'sans-serif'],
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      colors: EXTEND_COLORS,
    },
  },
  plugins: [
    plugin(({ addComponents, theme, matchComponents, addBase }) => {
      const animateButtonComponent = {
        transitionProperty: defaultTheme.transitionProperty.transform,
        transitionTimingFunction:
          defaultTheme.transitionTimingFunction['in-out'],
        transitionDuration: defaultTheme.transitionDuration.DEFAULT,
        '&:active': {
          transform: `scale(0.9)`,
        },
      };
      addComponents({
        '.animate-scale': animateButtonComponent,
        '.card': {
          borderRadius: defaultTheme.borderRadius['2xl'],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          overflow: 'hidden',
        },
        '.link': {
          color: 'rgba(52, 130, 255, 1)',
          transitionProperty: defaultTheme.transitionProperty.opacity,
          transitionTimingFunction:
            defaultTheme.transitionTimingFunction['in-out'],
          transitionDuration: defaultTheme.transitionDuration.DEFAULT,
          '&:active': {
            opacity: '0.7',
          },
        },
      });
      matchComponents({
        'animate-scale': (value) => {
          return value
            ? {
                ...animateButtonComponent,
                '&:active': {
                  transform: `scale(${Number(value)}%)`,
                },
              }
            : animateButtonComponent;
        },
      });
    }),
  ],
};
