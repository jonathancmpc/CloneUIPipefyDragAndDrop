import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Board from './components/Board';

function App() {
  return (
    <DndProvider backend={HTML5Backend}> {/* Vai utilizar a API de drag and drop do HTML5 para fazermos os drag and drops */}
      <Header />
      <Board />

      <GlobalStyle />
    </DndProvider>
  );
}

export default App;
