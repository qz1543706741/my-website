export default {
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
