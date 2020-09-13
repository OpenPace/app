import DefaultTheme from './DefaultTheme';

export default {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5e72e4',
    accent: '#03dac6',
    background: '#363644',
    surface: '#444454',
    error: '#CF6679',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    text: '#FFFFFF',
    // disabled: color(white).alpha(0.38).rgb().string(),
    // placeholder: color(white).alpha(0.54).rgb().string(),
    // backdrop: color(black).alpha(0.5).rgb().string(),
    // notification: pinkA100,
  },
};
