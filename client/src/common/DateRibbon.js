import React from 'react';
import styled from 'styled-components/macro';
import { formatToDateString, formatToDateStringWithoutYear, formatToTimeString } from '../utils/dateFormatters';

export default function DateRibbon({ date }) {
  const lastMidnight = new Date(new Date().setHours(0, 0, 0, 0));
  const isArchived = new Date(date) <= lastMidnight;

  return (
    <DateRibbonStyled>
      {isArchived ? (
        <DateStyled>{formatToDateString(date)}</DateStyled>
      ) : (
        <>
          <DateStyled>{formatToDateStringWithoutYear(date)}</DateStyled>
          <TimeStyled>{formatToTimeString(date)}</TimeStyled>
        </>
      )}
    </DateRibbonStyled>
  );
}

const DateRibbonStyled = styled.div`
  position: absolute;
  top: -24px;
  transform: skew(0deg, -13deg);
  width: min-content;
  font-size: 1.5em;
  font-weight: bold;
`;

const DateStyled = styled.span`
  padding: 5px 10px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
`;

const TimeStyled = styled.span`
  padding: 5px 10px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
`;
