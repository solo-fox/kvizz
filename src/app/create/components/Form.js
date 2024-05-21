'use client'

import React, { useState } from "react";
import styled from "styled-components";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button3D from "../../universal/Button";
import Loading from "../../universal/Loading";
import  { create_room } from "../../db/room"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function FormComponent() {
  // State for form inputs
  const [nickname, setNickname] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [usersnumber, Setusersnumber] = useState(2);
  const [time, setTime] = useState(10);
  const [rounds, setRounds] = useState(3);
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  const handleSubmit =  (e) => {
    e.preventDefault();
    if (nickname == "") {
      toast("Nickname cannot be empty", { type : "error"})
      return;
    }
    setLoading(true)
    create_room(nickname, isPublic, usersnumber, time, rounds)
    .then(({ room_id, user_id }) => {
      localStorage.setItem("user_id", user_id)
      toast("Room created!!!", {type: "success"})
      router.push(`/room/${room_id}/${user_id}`)
    }).catch((error) => {
      console.log(error)
      toast("Oops! An Error occured!", {type: "error"})
    })
    
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
            max="40" 
            min="5" 
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
  max-height:60vh;
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
