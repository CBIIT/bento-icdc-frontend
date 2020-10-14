import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import env from './env';

export default function createSvgIcon(path, displayName) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <SvgIcon data-mui-test={`${displayName}Icon`} ref={ref} {...props}>
        {path}
      </SvgIcon>
    )),
  );

  if (env.NODE_ENV !== 'production') {
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = SvgIcon.muiName;

  return Component;
}
