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
    <div>
      <Countdown 
        date={Date.now() + timerTime}
        renderer={renderer}
      />
    </div>
  )
}