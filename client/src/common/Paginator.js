import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default function Paginator({ page, setPage, limit, itemsPerPage }) {
  const [pageNumbers, setPageNumbers] = useState([]);

  const numberOfPages = useRef(0);

  useEffect(() => {
    numberOfPages.current = Math.ceil(limit / itemsPerPage);
  }, [itemsPerPage, limit]);

  useEffect(() => {
    const lowerBound = Math.max(1, page - 2);
    const upperBound = Math.min(page + 2, numberOfPages.current);
    const pagesArray = [];
    for (let i = lowerBound; i <= upperBound; i++) {
      pagesArray.push(i);
    }
    setPageNumbers(pagesArray);
  }, [page]);

  return (
    <PaginatorStyled>
      <BorderContainerStyled>
        <ButtonStyled onClick={() => setPage(1)} disabled={page === 1}>
          {'<<'}
        </ButtonStyled>
        {page <= 2 && <ButtonStyled disabled />}
        {page === 1 && <ButtonStyled disabled />}
        {pageNumbers.map((pageNumber) => (
          <ButtonStyled key={pageNumber} onClick={() => setPage(pageNumber)} disabled={pageNumber === page}>
            {pageNumber}
          </ButtonStyled>
        ))}
        {page === numberOfPages.current && <ButtonStyled disabled />}
        {page >= numberOfPages.current - 1 && <ButtonStyled disabled />}
        <ButtonStyled onClick={() => setPage(numberOfPages.current)} disabled={page === numberOfPages.current}>
          {'>>'}
        </ButtonStyled>
      </BorderContainerStyled>
    </PaginatorStyled>
  );
}

const PaginatorStyled = styled.div`
  width: 210px;
  margin: 40px auto;
  border-top: 3px solid var(--primary-color);
  border-bottom: 3px solid var(--primary-color);
`;

const BorderContainerStyled = styled.div`
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border-top: 5px dashed var(--primary-color);
  border-bottom: 5px dashed var(--primary-color);
`;

const ButtonStyled = styled.button`
  display: grid;
  align-items: center;
  height: 40px;
  width: 30px;
  border: 2px solid var(--primary-color);
  border-top-width: 3px;
  border-bottom-width: 1px;
  border-radius: 0;
  color: var(--primary-color);
  font-weight: bold;
  text-align: center;
  writing-mode: vertical-rl;
  background: none;

  :disabled {
    color: grey;
    pointer-events: none;
  }
`;
