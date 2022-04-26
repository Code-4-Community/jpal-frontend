import { chakra, forwardRef, ImageProps } from '@chakra-ui/react';
import * as React from 'react';
import fullLogo from '../logoBig.svg';

const FullLogo = forwardRef<ImageProps, 'img'>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <chakra.img src={fullLogo} ref={ref} {...props} />
));

export default FullLogo;
