import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Cursor = styled.div`
  position: fixed;
  width: 80px;
  height: 80px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 25%,
    rgba(0, 0, 0, 0) 75%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  filter: blur(15px) brightness(1.1); /* Slightly dimmer */
  transition: transform 0.05s linear;
  z-index: 9999;
`;

const GlowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <Cursor style={{ left: `${position.x}px`, top: `${position.y}px` }} />;
};

export default GlowCursor;
