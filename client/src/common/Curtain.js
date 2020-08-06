import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import leftCurtainImage from '../assets/leftCurtain.jpg';
import rightCurtainImage from '../assets/rightCurtain.jpg';
import blackLogdeImage from '../assets/blackLodge.png';

export default function LeftCurtain({ screenWidth, side }) {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [drag, setDrag] = useState(0);

  const mouseStart = useRef(null);

  return (
    <>
      <CurtainStyled
        screenWidth={screenWidth}
        side={side}
        isGrabbing={isGrabbing}
        drag={drag}
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
    setIsGrabbing(true);
  }

  function handleMouseMove(event) {
    if (isGrabbing) {
      let mouseDragOffset = event.clientX - mouseStart.current;
      if ((side === 'left' && mouseDragOffset <= 0) || (side === 'right' && mouseDragOffset >= 0)) {
        setDrag(mouseDragOffset);
      } else {
        setDrag(mouseDragOffset / 2);
      }
    }
  }

  function stopDragging() {
    setIsGrabbing(false);
    setDrag(0);
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
    cursor: ${(props) => (props.isGrabbing ? 'grabbing' : 'grab')};
    transform: translateX(${(props) => props.drag + 'px'});
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
