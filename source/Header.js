import React from 'react';
import styled from 'styled-components';

import header from './header.jpg';
import logo from './logo.png';

const Header = styled.div`
  background-image: url('${header}');
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Logo = styled.img`
  margin: 70px;
`

export default () => {
  return (
    <Header>
      <Logo src={logo} />
    </Header>
  )
}
