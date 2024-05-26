'use client'

import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useRouter } from 'next/navigation';
import styled from "styled-components";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button3D from "../../universal/Button";
import Loading from "../../universal/Loading";

export default function FormComponent() {
  // State for form inputs
  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [usersnumber, Setusersnumber] = useState(2);
  const [time, setTime] = useState(40);
  const [rounds, setRounds] = useState(3);
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nickname == "" || roomName == " ") {
      toast("Nickname and room name cannot be empty", { type : "error"})
      return;
    }
    setLoading(true)
    try{
      const response = await fetch("/api/croom", {
        method: "POST",
        body: JSON.stringify({
          nickname,
          isPublic,
          usersnumber,
          time,
          rounds,
          roomName
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      if(response.ok){
        const data = await response.json();
        reactLocalStorage.set("KVIZZ:USER_ID", data.payload.user_id)
        router.push(`/room/${data.payload.room_id}`)
        toast("Room created...", { type: "success" })
      } else {
        console.log(response)
        toast("Cannot create room!", { type: "error" })
      }
    } catch(error){
      console.log(error)
      toast("Cannot create room!", { type: "error" })
    }
  }
  
  return(
    <Form>
      <ToastContainer pauseOnHover/>
      <Loading state={loading} />
      <Header>
        <AddBoxIcon />
        <p>Create a Room</p>
      </Header>
      <input 
        type="text" 
        placeholder="Room Name" 
        value={roomName} 
        onChange={(e) => setRoomName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Nickname" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)} 
      />
      <Settings>
        <Group>
          <input 
            name="public" 
            type="checkbox" 
            checked={isPublic} 
            onChange={(e) => setIsPublic(e.target.checked)} 
          />
          <label htmlFor="public">Public</label>
        </Group>
        <Group>
          <input 
            className="range" 
            name="users" 
            type="range" 
            max="5" 
            min="2" 
            value={usersnumber} 
            onChange={(e) => Setusersnumber(parseInt(e.target.value))} 
          />
          <label htmlFor="number">Players Number: {usersnumber}</label>
        </Group>
        <Group>
          <input 
            className="range" 
            name="time" 
            type="range" 
            max="200" 
            min="40" 
            value={time} 
            onChange={(e) => setTime(parseInt(e.target.value))} 
          />
          <label htmlFor="time"> Time Per Round: {time}s</label>
        </Group>
        <Group>
          <input 
            className="range" 
            name="rounds" 
            type="range" 
            max="10" 
            min="2" 
            value={rounds} 
            onChange={(e) => setRounds(parseInt(e.target.value))} 
          />
          <label htmlFor="time"> Rounds: {rounds}</label>
        </Group>
      </Settings>
      <ButtonGroup>
        <Button3D 
          b1={"hsl(145deg 100% 47%)" } 
          b2={"hsl(140deg 100% 32%)"} 
          onClick={handleSubmit} // Handle form submission
        >
          <AddBoxIcon style={{fontSize:"22px" }}/> Create
        </Button3D>
      </ButtonGroup>
    </Form>
  )
}

const Form = styled.div`
  position:relative;
  background: white;
  width:40vw;
  max-height:70vh;
  border-radius:5px;
  padding:1rem 1.5rem;
  display:flex;
  flex-direction: column;
  gap:1rem;
  overflow:hidden;
  -webkit-box-shadow: 5px 10px 15px -5px rgba(88,25,8,0.73); 
  box-shadow: 5px 10px 15px -5px rgba(88,25,8,0.73);
  input{
    border:2px solid black;
    border-radius:5px;
    padding:0.2rem 0.5rem;
    outline:none;
  }
  
  @media only screen and (max-width: 768px) {
    width:80vw;
  }
`;

const Header = styled.div`
  font-family: "Pixelify Sans";
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size:20px;
  display:flex;
  align-items: center;
  gap:0.5rem;
  color: #03012C;
`;

const Settings = styled.div`
  display:flex;
  flex-direction: column;
  gap:1rem;
`;

const Group = styled.div`
  display:flex;
  align-items: center;
  gap:0.5rem;

  .range {
    width: 5rem;
  }
`;

const ButtonGroup = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  width:100%;
`;
