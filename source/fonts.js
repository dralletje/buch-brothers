import styled, { injectGlobal } from 'styled-components';

import hanshand from './fonts/hanshand.otf';
import cargo from './fonts/CARGO2.otf';

injectGlobal`
  @font-face {
    font-family: hanshand;
    src: url('${hanshand}');
  }
`

injectGlobal`
  @font-face {
    font-family: cargo;
    src: url('${cargo}');
  }
`
