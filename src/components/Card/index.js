import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

const Card = ({ data, index, listIndex }) => {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      //console.log(item.index); //Indice do Card que estou arrastando
      //console.log(data.id); //Card que estou em cima
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      // Se o usuário está arrastando o card em cima do mesmo card não faz nada, assim tbm com a lista.
      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      /* Pegando o tamanho do elemento referênciado, nesse caso o container */
      const targetSize = ref.current.getBoundingClientRect();
      /* Verificando onde é a metade do card - pixel central de cada card */
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      /* Verifica qual a distância dos pontos da tela que foi arrastado o item, ou seja, é a posição do item que está sendo arrastado na tela */
      const draggedOffset = monitor.getClientOffset();
      /* Verificando o quanto o item entrou para dentro do card que está por cima */
      const draggedTop = draggedOffset.y - targetSize.top;

      /* Se um item estiver antes do meio do item que está por cima não faz nada, pq o item irá continuar na sua posição atual */
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }
      /* Mesma coisa do item acima, porém aqui não fazemos nada se o item que está depois não passar do meio daquele item que está antes, pois continuará na mesma posição */
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }
      /* Passando através do contexto a posição da lista, o index da lista que estou movendo pra cima dela, a posição do item que eu estou movendo e do item abaixo dele */
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      /* Mudando o index do item no estado, dessa forma para de dar bug */
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  })

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      {data.user && (
        <img src={data.user} alt=""/>
      )}
    </Container>
  );
};

export default Card;
