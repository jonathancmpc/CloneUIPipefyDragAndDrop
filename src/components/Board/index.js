import React, { useState } from 'react';
import produce from 'immer';

import { loadLists } from '../../services/api';

import BoardContext from './context';

import List from '../List';

import { Container } from './styles';

const data = loadLists();

const Board = () => {
  const [lists, setLists] = useState(data);

  /* Função de onde eu quero mover o card para onde eu quero mover */
  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      /* Removendo o item que está sendo arrastado da lista */
      draft[fromList].cards.splice(from, 1);
      /* Inclui o item que está sendo arrastado dentro da lista que ele está em cima, na posição 0*/
      draft[toList].cards.splice(to, 0, dragged);
    }));
  }

  return (
    /* Passando o contexto com os dados da lista para todos, e toda vez que lists e move mudar será atualizado o contexto */
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
