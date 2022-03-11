import { chakra, forwardRef, ImageProps } from '@chakra-ui/react';
import * as React from 'react';
import logo from '../logo.svg';

const Logo = forwardRef<ImageProps, 'img'>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <chakra.img src={logo} ref={ref} {...props} />
));

export default Logo;
