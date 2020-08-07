import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import blackLogdeImage from '../assets/blackLodge.png';
import leftCurtainImage from '../assets/leftCurtain.jpg';
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
      <BlackLodgeStyled screenWidth={screenWidth} side={side} />
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
    transition: transform 1s linear;
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
