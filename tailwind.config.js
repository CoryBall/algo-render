const formsPlugin = require('@tailwindcss/forms');

module.exports = {
  darkMode: 'class',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  variants: {},
  plugins: [formsPlugin],
};
