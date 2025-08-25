import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Context from '../Context';
import michelImage from '../assets/michel.jpg';
import piez from '../assets/piez.png';
import DishForm from '../common/DishForm';
import DishListItem from '../common/DishListItem';
import { getDishes } from '../services/dishServices';
import LoadingPage from './LoadingPage';

export default function VokuPage() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isUserLoggedIn } = useContext(Context);

  useEffect(() => {
    getDishes().then((res) => {
      setDishes(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    document.title = 'VoKü | Rineuto Lichtspiele';
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <VokuPageStyled>
      <HeadlineStyled>
        Wir füttern die Hamburger Michel*
        <FootnoteLinkStyled href="#foodnote">
          <sup>*</sup>
        </FootnoteLinkStyled>
        innen
      </HeadlineStyled>
      <MichelStyled src={michelImage} />
      <DescriptionStyled>Immer vegan. Fast immer um 19:30 Uhr fertig.</DescriptionStyled>
      <SubHeadlineStyled>Gerichte:</SubHeadlineStyled>
      <DishListStyled>
        {dishes
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((dish) => (
            <DishListItem key={dish._id} dish={dish} dishes={dishes} setDishes={setDishes} />
          ))}
      </DishListStyled>
      {isUserLoggedIn && <DishForm dishes={dishes} setDishes={setDishes} />}
      <FootnoteStyled id="foodnote">
        <sup>*</sup> Michelin-Stern
      </FootnoteStyled>
      <PerlLinkStyled href="https://youtu.be/zuhNIRMhkrE" target="_blank" rel="noopener noreferrer">
        <PerlImageStyled src={piez} alt="Eine Pizza" />
      </PerlLinkStyled>
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

const DescriptionStyled = styled.p`
  margin: 40px 0 0 0;
  font-size: 1.2em;
  color: var(--primary-color);
`;

const SubHeadlineStyled = styled.h3`
  margin: 20px 0 10px 0;
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

const PerlLinkStyled = styled.a`
  margin-left: 200px;

  @media (min-width: 900px) {
    margin-left: 188.5px;
  }
`;

const PerlImageStyled = styled.img`
  height: 20px;
  width: 20px;
`;
