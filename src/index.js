import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { render } from 'react-dom';
import Board from './Components/Board';
import './style.css';

const GameContainer = styled.div`
	padding: 10px;
  background: #e2e2e2;
`;

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <GameContainer>
        <Board />
      </GameContainer>
    );
  }
}

render(<App />, document.getElementById('root'));
