'use client'

import styled from "styled-components"; import ColorizeIcon from '@mui/icons-material/Colorize';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button3D from "../../../universal/Button"
import TimerComponent from "../../../universal/Timer"
import {useState} from "react"

export default function ToolsComponent({setColor, color, fillColor, setFillColor}) {
  const [timer, setTimerCompleted] = useState(false);
  let timerTime = 10000;
  
  const handleClick = e => {
    switch (e.detail) {
      case 2:
        setFillColor("none")
        break;
      case 3:
        setFillColor("none")
        break;
    }
  }
  
  return(
    <Tool>
      <Button3D b2={"hsl(320deg 100% 47%)"} b1={"hsl(323deg 50% 70%)"} >
        <label htmlFor="colorpicker"> 
          <ColorizeIcon />
        </label>
        <input name="colorpicker" type="color" value={color} onChange={ e => setColor(e.target.value) }/>
      </Button3D>
      
      <Button3D b1={"hsl(345deg 100% 47%)" } b2={"hsl(342deg 76% 65%)"} onClick={handleClick} >
        <label htmlFor="fillcolorpicker"> 
          <FormatColorFillIcon />
        </label>
        <input name="fillcolorpicker" type="color" value={fillColor} onChange={ e => setFillColor(e.target.value) }/>
      </Button3D>
      
      <Button3D b1={"hsl(145deg 100% 47%)" } b2={"hsl(140deg 100% 32%"}>
        <CheckCircleIcon style={{fontSize:"32px" }}/> Submit
      </Button3D>
      <Timer>
        <TimerComponent setTimerCompleted={setTimerCompleted} timerTime={timerTime} />
      </Timer>
    </Tool>
  )
}

const Tool = styled.div`
position:absolute;
top:0px;
width:100vw;
background-color: #190E4F;
color:white;
padding:1rem 1rem 10px 2rem;
z-index:8;
display:flex;
align-items:center;
gap:1rem;
input {
  border:1px #002A22 solid;
  outline:none;
  border-radius:50%;
  width:32px;
  height:32px;
}
`

const Timer = styled.div`
margin-left:auto;
font-weight:800;
background:#581908;
padding:0.5rem 1rem;
border-radius:5px;
`