import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import rightCurtainImage from '../assets/rightCurtain.jpg';
import blackLogdeImage from '../assets/blackLodge.png';

export default function RightCurtain({ screenWidth }) {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [drag, setDrag] = useState(0);

  const mouseStart = useRef(null);

  return (
    <>
      <RightCurtainStyled
        screenWidth={screenWidth}
        isGrabbing={isGrabbing}
        drag={drag}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      />
      <BlackLodgeStyled screenWidth={screenWidth} />
    </>
  );

  function handleMouseDown(event) {
    mouseStart.current = event.clientX;
    setIsGrabbing(true);
  }

  function handleMouseMove(event) {
    if (isGrabbing) {
      const mouseDragOffset = event.clientX - mouseStart.current;
      if (mouseDragOffset >= 0) {
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

const RightCurtainStyled = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
    position: fixed;
    left: ${(props) => 510 + props.screenWidth / 2 + 'px'};
    top: -10%;
    z-index: 10;
    height: 120%;
    width: 100vh;
    background-image: url(${rightCurtainImage});
    background-size: contain;
    box-shadow: -15px 0 20px black;
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
    left: ${(props) => 510 + props.screenWidth / 2 + 'px'};
    height: 100%;
    width: 100vh;
    background-image: url(${blackLogdeImage});
    background-size: 600px 1200px;
    background-position: top left;
  }
`;
