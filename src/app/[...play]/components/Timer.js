'use client'
import styled from "styled-components"; import ColorizeIcon from '@mui/icons-material/Colorize';
import Countdown from "react-countdown";

export default function TimerComponent({timerTime, setTimerCompleted}) {
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setTimerCompleted(true)
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };
  return(
    <Timer>
      <Countdown 
        date={Date.now() + timerTime}
        renderer={renderer}
      />
    </Timer>
  )
}

const Timer = styled.div`
margin-left:auto;
font-weight:800;
background:#581908;
padding:0.5rem 1rem;
border-radius:5px;
`