import '../src/modules/ui/rd.css'; // global css
import '../src/modules/ui/index.ts'; // library of UI components

const withThemeProvider = (Story, context) => {
  document.body.setAttribute('data-theme', context.globals.theme);
  return Story();
};

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark']
    }
  }
};
