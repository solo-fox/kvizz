'use client'

import WordComponent from "./Word"
import styled from "styled-components";
import generateId from "./generateId.js"
import React, {
  useEffect, 
  useState,
  useRef
} from 'react';
import Button3D from "../../universal/Button"
import DeleteIcon from '@mui/icons-material/Delete';

export default function CanvasComponent({fillColor, color}) {
  const svgRef = React.useRef();
  const [isDrawing,
    setIsDrawing] = React.useState(false);
  const [turn,
    setTurn] = React.useState(true);
  const [id,
    setId] = React.useState('');
  const [lines,
    setLines] = React.useState([]);

  const handleMouseDown = (e) => {
    handleStartDrawing(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    handleStartDrawing(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleStartDrawing = (x, y) => {
    const id = generateId(6);
    const svgRect = svgRef.current.getBoundingClientRect();
    const startingPoint = {
      x: x - svgRect.x,
      y: y - svgRect.y,
    };
    setIsDrawing(true);
    setId(id);
    setLines((lines) => (
      lines.concat({
        id,
        points: [startingPoint],
      })
    ));
  };

  const handleMouseMove = (e) => {
    handleMoving(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    handleMoving(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMoving = (x, y) => {
    if (!isDrawing) {
      return;
    }
    const svgRect = svgRef.current.getBoundingClientRect();

    setLines((lines) => (
      lines.map((line) => (
        line.id === id
        ? {
          ...line,
          points: line.points.concat({
            x: x - svgRect.x,
            y: y - svgRect.y,
          }),
          strokeColor: color,
          fill: fillColor,
        }: line
      ))
    ));
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
  };
  
  const earse = e => setLines([]);
  return (
    <CanvasBoard>
    <Layer style={{ display: turn ? "none" : "block" }}/>
    <WordComponent display={turn} />
    <Del>
      <Button3D b1={"hsl(330deg 100% 47%)" } b2={"hsl(320deg 100% 32%)"} onClick={earse} >
        <DeleteIcon style={{fontSize:"32px"}} /> Delete
      </Button3D>
    </Del>
    <Canvas
      ref={svgRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleStopDrawing}
      onMouseLeave={handleStopDrawing}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleStopDrawing}
      style={ {
        touchAction: "none",
      }}
      >
        {
      lines.map(({
        id, points, strokeColor, fill
      }) => (
        <polyline
          key={id}
          fill={fill}
          stroke={strokeColor}
          strokeWidth="2"
          points={points.map(point => `${point.x},${point.y}`).join(" ")}
          />
      ))
      }
    </Canvas>
    </CanvasBoard>
  );
};

const Canvas = styled.svg`
width:100%;
height:100%;
cursor: crosshair;
`

const Del = styled.div`
position:absolute;
right:2rem;
bottom:1rem;

`

const CanvasBoard = styled.div`
background-color:white;
width:100%;
height:89vh;
position:relative;
`

const Layer = styled.div`
background-color:transparent;
position:absolute;
bottom:0px;
left:0px;
width:100vw;
height:89vh;
z-index:100;
`