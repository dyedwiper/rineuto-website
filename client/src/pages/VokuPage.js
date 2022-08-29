import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDishes } from '../utils/services';
import LoadingPage from './LoadingPage';
import michelImage from '../assets/michel.jpg';
import { formatToDateString } from '../utils/dateFormatters';

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
      <SubHeadlineStyled>
        Wir füttern die Hamburger Michel*
        <FootnoteLinkStyled href="#foodnote">
          <sup>*</sup>&nbsp;
        </FootnoteLinkStyled>
        innen
      </SubHeadlineStyled>
      <MichelStyled src={michelImage} />
      <DishListStyled>
        {dishes.map((dish) => (
          <DishListItemStyled key={dish._id}>
            <DateStyled>{formatToDateString(dish.date)}</DateStyled>
            <NameStyled>{dish.name}</NameStyled>
          </DishListItemStyled>
        ))}
      </DishListStyled>
      <FootnoteStyled>
        <sup>*</sup> Michelin-Stern
      </FootnoteStyled>
    </VokuPageStyled>
  );
}

const VokuPageStyled = styled.div``;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: var(--primary-color);
`;

const FootnoteLinkStyled = styled.a`
  color: var(--primary-color);
  text-decoration: none;
`;

const MichelStyled = styled.img`
  display: block;
  margin: 0 auto;
`;

const DishListStyled = styled.ul`
  margin: 40px auto;
  list-style: none;
`;

const DishListItemStyled = styled.li`
  font-size: 1.2em;
  color: var(--primary-color);
`;

const DateStyled = styled.span`
  margin: 0 10px 0 0;
`;

const NameStyled = styled.span``;

const FootnoteStyled = styled.div`
  margin: 40px auto 20px auto;
  max-width: 600px;
  color: var(--primary-color);
`;
