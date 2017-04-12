import React from 'react';
import styled, { injectGlobal } from 'styled-components';

import Header from './Header';
// import Sidestory from './Sidestory';
import Story from './Story';

// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'

import './fonts';

injectGlobal`
  body, html {
    padding: 0;
    margin: 0;
  }
`

injectGlobal`
  * {
    box-sizing: border-box;
  }
`

const Slider = styled.div`
  transition: all 2s;
  width: ${({ children }) => children.length}00vw;
  display: flex;
  flex-direction: row;
  transform: translateX( -${({ page }) => page}00vw );
`

const SliderPage = styled.div`
  width: 100vw;
  flex-direction: column;
`

class App extends React.PureComponent {
  state = {
    sidestory: null,
  }

  render() {
    const {} = this.props;
    const { sidestory } = this.state;

    return (
      <div style={{ overflow: 'hidden' }}>
        <Header />

        <Story
          activeSection={sidestory}
          onClickSection={(section) => {
            this.setState({
              sidestory: sidestory === section ? null : section,
            });
          }}
        />
      </div>
    )
  }
}

export default App;
