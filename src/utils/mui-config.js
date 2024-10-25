import { createGenerateClassName } from '@material-ui/core/styles';

export const generateClassName = createGenerateClassName({
  // By enabling this option, if you have non-MUI elements (for example `<div />`)
  // using MUI classes (for example `.MuiButton`) they will lose styles.
  // Make sure to convert them to use `styled()` or `<Box />` first.
  disableGlobal: true,
  // Class names will receive this seed to avoid name collisions.
  seed: 'mui-jss',
});