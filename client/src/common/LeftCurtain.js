import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import leftCurtainImage from '../assets/leftCurtain.jpg';
import blackLogdeImage from '../assets/blackLodge.png';

export default function LeftCurtain({ screenWidth, isGrabbing, setIsGrabbing }) {
  const [drag, setDrag] = useState(0);

  const mouseStart = useRef(null);

  return (
    <>
      <LeftCurtainStyled
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
      console.log(event);
      const mouseDragOffset = event.clientX - mouseStart.current;
      if (mouseDragOffset <= 0) {
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

const LeftCurtainStyled = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
    position: fixed;
    right: ${(props) => 510 + props.screenWidth / 2 + 'px'};
    top: -10%;
    z-index: 10;
    height: 120%;
    width: 100vh;
    background-image: url(${leftCurtainImage});
    background-size: contain;
    box-shadow: 15px 0 20px black;
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
    right: ${(props) => 510 + props.screenWidth / 2 + 'px'};
    height: 100%;
    width: 100vh;
    background-image: url(${blackLogdeImage});
    background-size: 600px 1200px;
    background-position: top right;
  }
`;
