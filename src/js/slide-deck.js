'use strict';

import * as bespoke from './bespoke.js';
import navKbd from './bespoke-nav-kbd.js';
import hash from './bespoke-hash.js';
import classes from './bespoke-classes.js';
import protocol from './bespoke-protocol.js';

const deck = bespoke.from({ parentSelector: 'body', slidesSelector: 'section.slide' }, [
  navKbd(),
  classes(),
  // should be last
  hash(),
  protocol(),
]);
