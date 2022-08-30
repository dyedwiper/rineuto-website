import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import michelImage from '../assets/michel.jpg';
import DishForm from '../common/DishForm';
import DishListItem from '../common/DishListItem';
import Context from '../Context';
import { getDishes } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function VokuPage() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isUserLoggedIn } = useContext(Context);

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
      <HeadlineStyled>
        Wir füttern die Hamburger Michel*
        <FootnoteLinkStyled href="#foodnote">
          <sup>*</sup>&nbsp;
        </FootnoteLinkStyled>
        innen
      </HeadlineStyled>
      <MichelStyled src={michelImage} />
      <SubHeadlineStyled>Gerichte:</SubHeadlineStyled>
      <DishListStyled>
        {dishes
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((dish) => (
            <DishListItem key={dish._id} dish={dish} dishes={dishes} setDishes={setDishes} />
          ))}
      </DishListStyled>
      {isUserLoggedIn && <DishForm dishes={dishes} setDishes={setDishes} />}
      <FootnoteStyled>
        <sup>*</sup> Michelin-Stern
      </FootnoteStyled>
    </VokuPageStyled>
  );
}

const VokuPageStyled = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 0 20px;

  @media (min-width: 900px) {
    padding: 0 50px;
  }
`;

const HeadlineStyled = styled.h2`
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
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

const SubHeadlineStyled = styled.h3`
  margin: 40px 0 20px 0;
  color: var(--primary-color);
`;

const DishListStyled = styled.ul`
  margin: 0 0 40px 0;
  padding: 0;
  list-style: none;
`;

const FootnoteStyled = styled.div`
  margin: 40px auto 20px auto;
  max-width: 600px;
  color: var(--primary-color);
`;
