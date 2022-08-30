import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from '../Context';
import { formatToDateString } from '../utils/dateFormatters';
import { deleteDish } from '../utils/services';
import { getFromLocalStorage } from '../utils/storage';

export default function DishListItem({ dish, dishes, setDishes }) {
  const { isUserLoggedIn, setIsWaiting } = useContext(Context);

  return (
    <DishListItemStyled>
      <DateStyled>{formatToDateString(dish.date)}</DateStyled>
      <NameStyled>{dish.name}</NameStyled>
      {isUserLoggedIn && <DeleteButtonStyled onClick={handleDelete}>Löschen</DeleteButtonStyled>}
    </DishListItemStyled>
  );

  function handleDelete() {
    const jwt = getFromLocalStorage('rineuto-token');
    setIsWaiting(true);
    deleteDish(dish._id, jwt)
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
