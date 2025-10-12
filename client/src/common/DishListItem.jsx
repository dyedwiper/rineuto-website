import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Context from '../Context';
import { deleteDish } from '../services/dishServices';
import { formatToDateString } from '../utils/dateFormatters';
import DeletePrompt from './DeletePrompt';

export default function DishListItem({ dish, dishes, setDishes }) {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  const { isUserLoggedIn, setIsWaiting } = useContext(Context);

  return (
    <DishListItemStyled>
      <DateStyled>{formatToDateString(dish.date)}</DateStyled>
      <NameStyled>{dish.name}</NameStyled>
      {isUserLoggedIn && <DeleteButtonStyled onClick={() => setShowDeletePrompt(true)}>Löschen</DeleteButtonStyled>}
      {showDeletePrompt && <DeletePrompt handleDelete={handleDelete} setShowDeletePrompt={setShowDeletePrompt} />}
    </DishListItemStyled>
  );

  function handleDelete() {
    setIsWaiting(true);
    deleteDish(dish._id)
      .then(() => {
        const updatedDishes = dishes.filter((x) => x !== dish);
        setDishes(updatedDishes);
      })
      .finally(() => {
        setIsWaiting(false);
      });
  }
}

const DishListItemStyled = styled.li`
  margin: 5px 0;
  font-size: 1.2em;
  color: var(--primary-color);
`;

const DateStyled = styled.span`
  margin: 0 20px 0 0;
`;

const NameStyled = styled.span``;

const DeleteButtonStyled = styled.button`
  margin: 0 0 0 20px;
`;
