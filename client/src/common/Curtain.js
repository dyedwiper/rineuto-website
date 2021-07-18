import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import blackLogdeImage from '../assets/blackLodge.png';
import goldBallImage from '../assets/goldBall.png';
import leftCurtainImage from '../assets/leftCurtain.jpg';
import radImage from '../assets/rad.png';
import cigaretteImage from '../assets/cigarette.png';
import computerFreakImage from '../assets/computerfreak.png';
import rightCurtainImage from '../assets/rightCurtain.jpg';

export default function LeftCurtain({ screenWidth, side, isDragging, setIsDragging }) {
  const mouseStart = useRef(null);
  const curtain = useRef(null);

  return (
    <>
      <CurtainStyled
        ref={curtain}
        screenWidth={screenWidth}
        side={side}
        isDragging={isDragging}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      />
      <BlackLodgeStyled screenWidth={screenWidth} side={side}>
        <GoldenBallLinkStyled
          side={side}
          href="https://www.youtube.com/watch?v=ZkbDN5u4r8o"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoldBallImageStyled src={goldBallImage} alt="Eine goldene Kugel" />
        </GoldenBallLinkStyled>
        {window.location.pathname.includes('5f10d590bc13b800178e3a9c') && (
          <BikeLinkStyled side={side} href="https://youtu.be/N70pChTGtNM" target="_blank" rel="noopener noreferrer">
            <CircleImageStyled src={radImage} alt="Das Rad eines Fahrrades" />
          </BikeLinkStyled>
        )}
        {window.location.pathname.includes('5f31b1ba433d7c00176b8487') && (
          <CigaretteLinkStyled
            side={side}
            href="https://youtu.be/vzSjiDDtlIE"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CircleImageStyled src={cigaretteImage} alt="Das glimmende Ende einer Zigarette" />
          </CigaretteLinkStyled>
        )}
        {window.location.pathname.includes('5f31a3a4433d7c00176b847b') && (
          <ComputerFreakLinkStyled
            side={side}
            href="https://youtu.be/bqEq16hduNI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CircleImageStyled src={computerFreakImage} alt="Eine leuchtende Kugel" />
          </ComputerFreakLinkStyled>
        )}
      </BlackLodgeStyled>
    </>
  );

  function handleMouseDown(event) {
    mouseStart.current = event.clientX;
    setIsDragging(true);
  }

  function handleMouseMove(event) {
    if (isDragging) {
      let mouseDragOffset = event.clientX - mouseStart.current;
      if ((side === 'left' && mouseDragOffset <= 0) || (side === 'right' && mouseDragOffset >= 0)) {
        curtain.current.style.transform = 'translateX(' + mouseDragOffset + 'px)';
      } else {
        curtain.current.style.transform = 'translateX(' + mouseDragOffset / 2 + 'px)';
      }
    }
  }

  function stopDragging() {
    curtain.current.style.transform = 'translateX(0)';
    setIsDragging(false);
  }
}

const CurtainStyled = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
    position: fixed;
    right: ${(props) => (props.side === 'left' ? 510 + props.screenWidth / 2 + 'px' : 'auto')};
    left: ${(props) => (props.side === 'right' ? 510 + props.screenWidth / 2 + 'px' : 'auto')};
    top: -10%;
    z-index: 10;
    height: 120%;
    width: 100vh;
    background-image: ${(props) => (props.side === 'left' ? `url(${leftCurtainImage})` : `url(${rightCurtainImage})`)};
    background-size: contain;
    box-shadow: ${(props) => (props.side === 'left' ? '15px' : '-15px')} 0 20px black;
    cursor: ${(props) => (props.isDragging ? 'grabbing' : 'grab')};
    transform: translateX(0);
    transition: transform 1.5s linear;
  }
`;

const BlackLodgeStyled = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
    position: fixed;
    top: 0;
    right: ${(props) => (props.side === 'left' ? 510 + props.screenWidth / 2 + 'px' : 'auto')};
    left: ${(props) => (props.side === 'right' ? 510 + props.screenWidth / 2 + 'px' : 'auto')};
    height: 100%;
    width: 100vh;
    background-image: url(${blackLogdeImage});
    background-size: 600px 1200px;
    background-position: top ${(props) => (props.side === 'left' ? 'right' : 'left')};
  }
`;

const GoldenBallLinkStyled = styled.a`
  position: absolute;
  top: 280px;
  right: 80px;
  z-index: 1;
  display: ${(props) => (props.side === 'left' ? 'block' : 'none')};
`;

const GoldBallImageStyled = styled.img`
  height: 20px;
  width: 20px;
`;

const BikeLinkStyled = styled.a`
  position: absolute;
  top: 520px;
  left: 40px;
  z-index: 1;
  display: ${(props) => (props.side === 'right' ? 'block' : 'none')};
`;

const CigaretteLinkStyled = styled.a`
  position: absolute;
  top: 320px;
  left: 20px;
  z-index: 1;
  display: ${(props) => (props.side === 'right' ? 'block' : 'none')};
`;

const ComputerFreakLinkStyled = styled.a`
  position: absolute;
  top: 160px;
  left: 20px;
  z-index: 1;
  display: ${(props) => (props.side === 'right' ? 'block' : 'none')};
`;

const CircleImageStyled = styled.img`
  height: 20px;
  width: 20px;
`;
