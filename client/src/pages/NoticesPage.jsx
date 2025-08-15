import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import jeverFunImage from '../assets/jeverFun.png';
import NoticeCard from '../common/NoticeCard';
import Paginator from '../common/Paginator';
import { NOTICES_PER_PAGE } from '../constants';
import { getNotices } from '../services/noticeServices';
import LoadingPage from './LoadingPage';

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const windowHeight = useRef(null);

  useEffect(() => {
    document.title = 'Rineuto Lichtspiele';
    windowHeight.current = window.innerHeight;
  }, []);

  useEffect(() => {
    getNotices().then((res) => {
      setNotices(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <NoticePageStyled>
      <SubHeadlineStyled>Neutigkeiten</SubHeadlineStyled>
      <NoticesListStyled>
        {notices
          .sort((a, b) => b.date - a.date)
          .slice((page - 1) * NOTICES_PER_PAGE, page * NOTICES_PER_PAGE)
          .map((notice) => (
            <NoticeCard key={notice._id} notice={notice} />
          ))}
      </NoticesListStyled>
      <Paginator page={page} setPage={setPage} limit={notices.length} itemsPerPage={NOTICES_PER_PAGE} />
      <Cushion />
      <PerlLinkStyled
        windowHeight={windowHeight.current}
        href="https://www.youtube.com/watch?v=hXgY_L74a_U"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PerlImageStyled src={jeverFunImage} alt="Eine hellbraune Bügelperle" />
      </PerlLinkStyled>
    </NoticePageStyled>
  );
}

const NoticePageStyled = styled.div``;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0 0 0;
  text-align: center;
  color: var(--primary-color);
`;

const NoticesListStyled = styled.ul`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 50px;
  margin: 0 auto;
  max-width: 600px;
  padding: 30px 20px;
  list-style-type: none;
`;

const Cushion = styled.div`
  height: 30px;
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  bottom: ${(props) => (props.windowHeight % 20 === 0 ? '0' : (props.windowHeight % 20) + 'px')};
  left: 200px;
  z-index: 1;
  height: 20px;
  width: 20px;

  @media (min-width: 900px) {
    left: 500px;
  }
`;

const PerlImageStyled = styled.img`
  height: 20px;
  width: 20px;
`;
