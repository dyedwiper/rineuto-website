import React from 'react';
import styled from 'styled-components/macro';
import blackPerlImage from '../assets/perls/blackPerl.png';
import whiteCircleImage from '../assets/whitePerlsCircle.png';

export default function LoadingPage() {
  return (
    <LoadingPageStyled>
      <WhiteCircleStyled>
        <BlackPerlStyled
          src={blackPerlImage}
          alt="Eine Perle rotiert im Kreis und zeigt an, dass ein Ladevorgang im Gang ist"
        />
      </WhiteCircleStyled>
    </LoadingPageStyled>
  );
}

const LoadingPageStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const WhiteCircleStyled = styled.div`
  position: absolute;
  top: ${(window.innerHeight / 2 - (window.innerHeight % 20) / 2) % 20 === 0
    ? window.innerHeight / 2 - (window.innerHeight % 20) / 2 - 140
    : window.innerHeight / 2 - (window.innerHeight % 20) / 2 - 150}px;
  left: ${window.innerWidth / 2 - (window.innerWidth % 20) / 2 - 80}px;
  width: 180px;
  height: 180px;
  background-image: url(${whiteCircleImage});

  @media (min-width: 900px) {
    top: 180px;
    left: 300px;
  }
`;

const BlackPerlStyled = styled.img`
  position: absolute;

  animation-name: circle;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  @keyframes circle {
    0% {
      top: 60px;
      left: 0;
    }
    5% {
      top: 80px;
      left: 0;
    }
    10% {
      top: 100px;
      left: 0;
    }
    15% {
      top: 120px;
      left: 20px;
    }
    20% {
      top: 140px;
      left: 40px;
    }
    25% {
      top: 160px;
      left: 60px;
    }
    30% {
      top: 160px;
      left: 80px;
    }
    35% {
      top: 160px;
      left: 100px;
    }
    40% {
      top: 140px;
      left: 120px;
    }
    45% {
      top: 120px;
      left: 140px;
    }
    50% {
      top: 100px;
      left: 160px;
    }
    55% {
      top: 80px;
      left: 160px;
    }
    60% {
      top: 60px;
      left: 160px;
    }
    65% {
      top: 40px;
      left: 140px;
    }
    70% {
      top: 20px;
      left: 120px;
    }
    75% {
      top: 0;
      left: 100px;
    }
    80% {
      top: 0;
      left: 80px;
    }
    85% {
      top: 0;
      left: 60px;
    }
    90% {
      top: 20px;
      left: 40px;
    }
    95% {
      top: 40px;
      left: 20px;
    }
    100% {
      top: 60px;
      left: 0;
    }
  }
`;
