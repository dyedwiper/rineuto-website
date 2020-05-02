import React from 'react';
import styled from 'styled-components/macro';
import YearNavigation from '../common/YearNavigation';
import whitePerlImage from '../assets/perls/whitePerl.png';

export default function PosterPage() {
  return (
    <PosterPageStyled>
      <YearNavigation
        years={[
          '2018',
          '2019',
          '2020',
          '2021',
          '2022',
          '2022',
          '2022',
          '2022',
          '2022',
          '2022',
          '2022',
          '2022',
          '2022',
        ]}
      />
      <PosterListStyled>
        <PosterItemStyled>
          <PosterStyled src="/posters/2018/rineuto_poster_201805.jpg" />
        </PosterItemStyled>
        <PosterItemStyled>
          <PosterStyled src="/posters/2018/rineuto_poster_201807.jpg" />
        </PosterItemStyled>
        <PosterItemStyled>
          <PosterStyled src="/posters/2018/rineuto_poster_201809.jpg" />
        </PosterItemStyled>
        <PosterItemStyled>
          <PosterStyled src="/posters/2018/rineuto_poster_201811.jpg" />
        </PosterItemStyled>
      </PosterListStyled>
    </PosterPageStyled>
  );
}

const PosterPageStyled = styled.div``;

const PosterListStyled = styled.ul`
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: 320px;
  grid-gap: 40px;
  justify-content: center;
  overflow: auto;
  margin: 0;
  padding: 40px;
  list-style: none;

  @media (min-width: 760px) {
    grid-template-columns: 320px 320px;
  }
`;

const PosterItemStyled = styled.li`
  width: 320px;
  padding: 20px;
  background-image: url(${whitePerlImage});
`;

const PosterStyled = styled.img`
  width: 280px;
`;
