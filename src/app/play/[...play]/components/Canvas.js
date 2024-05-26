'use client';

import WordComponent from "./Word";
import styled from "styled-components";
import generateId from "./generateId.js";
import {
  useEffect, 
  useState,
  useRef
} from 'react';
import { sendLines, updateTimer, evalUserScore } from "../../../db/play";
import { ToastContainer, toast } from 'react-toastify';
import { ref, onValue } from "firebase/database";
import { decode } from '@hugov/shorter-string';
import { reactLocalStorage } from 'reactjs-localstorage';
import { dbBroadcast } from '../../../firebase';
import Button3D from "../../../universal/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from "../../../universal/Loading";
import Err from "../../../universal/error";
import { withMask } from 'use-mask-input';
import { useRouter } from "next/navigation"

export default function CanvasComponent({ fillColor, color, room_id, user_id }) {
  const svgRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [id, setId] = useState('');
  const [lines, setLines] = useState([]);
  const [turn, setTurn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState("");
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(10);
  const [isValid, setIsValid] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    async function validateBackend() {
      const user_id_local = reactLocalStorage.get('KVIZZ:USER_ID');
      console.log(user_id_local)
      if(user_id_local == null){
        setIsValid(false)
        setLoading(false)
      }
      try {
        const response = await fetch("/api/valid", {
          method: "POST",
          body: JSON.stringify({ roomId: room_id, userId: user_id_local }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });
  
        if (response.ok == false) {
          setIsValid(false);
          setLoading(false);
          return;
        }
        setTurn(user_id_local === user_id);
        setIsValid(true)
      } catch (error) {
        console.error(error);
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    }
    validateBackend();
  }, [room_id, user_id]);
  
  useEffect(() => {
    async function getGameData() {
      try {
        const gameDataResponse = await fetch("/api/gamedata", {
          method: "POST",
          body: JSON.stringify({ roomId: room_id }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });
  
        if (!gameDataResponse.ok) {
          toast("Unexpected Error", { type: "error" });
          return;
        }
  
        const data = await gameDataResponse.json();
        setTime(data.payload.time);
        setWord(data.payload.word)
        toast("Timer will start in 5 seconds!")
        setStart(true)
      } catch (error) {
        console.error(error);
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    }
    getGameData();
  }, []);

  useEffect(() => {
    if (turn) {
      sendLines(room_id, JSON.stringify(lines))
    }
  }, [lines, isDrawing, turn]);

  useEffect(() => {
    const dbRef = ref(dbBroadcast, room_id);
    if (!turn) {
      const unsubscribe = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if(decode(data.svgLines) != ""){
          setLines(JSON.parse(decode(data.svgLines)))
        }
      });
      return () => unsubscribe && unsubscribe() ;
    }
  }, [room_id]);

  const handleStartDrawing = (x, y) => {
    const id = generateId(6);
    const svgRect = svgRef.current.getBoundingClientRect();
    const startingPoint = {
      x: x - svgRect.x,
      y: y - svgRect.y,
    };
    setIsDrawing(true);
    setId(id);
    setLines((lines) => [...lines, { id, points: [startingPoint] }]);
  };

  const handleMouseDown = (e) => handleStartDrawing(e.clientX, e.clientY);
  const handleTouchStart = (e) => handleStartDrawing(e.touches[0].clientX, e.touches[0].clientY);

  const handleMoving = (x, y) => {
    if (!isDrawing) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    setLines((lines) =>
      lines.map((line) =>
        line.id === id
          ? {
              ...line,
              points: [...line.points, { x: x - svgRect.x, y: y - svgRect.y }],
              strokeColor: color,
              fill: fillColor,
            }
          : line
      )
    );
  };

  const handleMouseMove = (e) => handleMoving(e.clientX, e.clientY);
  const handleTouchMove = (e) => handleMoving(e.touches[0].clientX, e.touches[0].clientY);
  const handleStopDrawing = () => setIsDrawing(false);
  const erase = () => setLines([]);
  const handelTimerFinished = async () => {
    setLoading(true)
    if( !turn ) {
      const user_id_local = reactLocalStorage.get('KVIZZ:USER_ID');
      try{
        const { finished } = await evalUserScore(room_id,user_id_local, user_id, guess)
        if(finished) {
          console.log("finished")
          router.push(`/eval/${room_id}`)
        }
      }catch(error){
        console.log(error)
        toast("Evalution failed", { type: "error" })
        return;
      }
    }
    router.push(`/room/${room_id}`)
  }
  
  useEffect(() => {
    const runCountDown = async () => {
      const { time: updatedTime, finished } = await updateTimer(room_id);
      if(finished){
        await handelTimerFinished()
      }
      setTime(updatedTime);
    };

    if (time > 0 && start) {
      const timer = setTimeout(() => {
        runCountDown();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [time, start]);
  

  return (
  <>
    <ToastContainer />
    {isValid == true ? (
      <>
        <CanvasBoard>
          <CanvasData>
            <Countdown>{time}</Countdown>
            {word != "" && turn ? (
              <Word>{word}</Word>
            ) : (
              <input
                onChange={(e) => setGuess(e.target.value)}
                type="text"
                placeholder="Guess the word"
                ref={withMask("a".repeat(word.length))}
              />
            )}
          </CanvasData>
          <Layer style={{ display: turn ? "none" : "block" }} />
          {turn && (
            <Del>
              <Button3D b1="hsl(330deg 100% 47%)" b2="hsl(320deg 100% 32%)" onClick={erase}>
                <DeleteIcon style={{ fontSize: "32px" }} /> Delete
              </Button3D>
            </Del>
          )}
          <Canvas
            ref={svgRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleStopDrawing}
            onMouseLeave={handleStopDrawing}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleStopDrawing}
            style={{ touchAction: "none" }}
          >
            {lines.map(({ id, points, strokeColor, fill }) => (
              <polyline
                key={id}
                fill={fill}
                stroke={strokeColor}
                strokeWidth="2"
                points={points.map((point) => `${point.x},${point.y}`).join(" ")}
              />
            ))}
          </Canvas>
        </CanvasBoard>
      </>
    ) : (
      <>
        {isValid == null ? (
          <Loading state={loading} />
        ) : (
          <Err msg="Invalid ID" />
        )}
      </>
    )}
  </>
);

}


const Canvas = styled.svg`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

const Del = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 1rem;
`;

const CanvasBoard = styled.div`
  background-color: white;
  width: 100%;
  height: 89vh;
  position: relative;
`;

const Layer = styled.div`
  background-color: transparent;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 89vh;
  z-index: 100;
`;

const CanvasData = styled.div`
  position: absolute;
  top: 5rem;
  width:100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 101;
  input {
    text-align: center;
    border:1px solid black;
    outline: none;
    border-radius: 5px;
  }
`

const Word = styled.div`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
`

const Countdown = styled.div`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
`;
