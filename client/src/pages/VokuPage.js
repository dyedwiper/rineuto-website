import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDishes } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function VokuPage() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDishes().then((dishes) => {
      setDishes(dishes);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <VokuPageStyled>
      <SubHeadlineStyled>Wir kochen für die Hamburger Michel*innen</SubHeadlineStyled>
      <DishListStyled>
        {dishes.map((dish) => (
          <DishListItemStyled key={dish._id}>{dish.date + ' ' + dish.name}</DishListItemStyled>
        ))}
      </DishListStyled>
    </VokuPageStyled>
  );
}

const VokuPageStyled = styled.div``;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: var(--primary-color);
`;

const DishListStyled = styled.ul``;

const DishListItemStyled = styled.li`
  color: white;
`;
