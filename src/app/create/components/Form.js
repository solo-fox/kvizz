'use client'

import React, { useState } from "react";
import styled from "styled-components";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button3D from "../../universal/Button";
import PacmanLoader from "react-spinners/PacmanLoader";
import { nanoid } from 'nanoid'
import { collection, addDoc } from "firebase/firestore";
import {db_broadcast, db_store} from '../../firebase';
import { ref, set } from "firebase/database";


export default function FormComponent() {
  // State for form inputs
  const [nickname, setNickname] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [maxNumber, setMaxNumber] = useState(2);
  const [time, setTime] = useState(10);
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    let room = {
      users : {
        [nanoid()] : {
        name: nickname,
        host: true,
        score: 0,
        onTurn: true
        }
      },
      isPublic,
      maxNumber,
      time,
      word: "Dog"
    }
    try {
      const docRef = await addDoc(collection(db_store, "rooms"), {
        room: room
      });
      console.log("Document written with ID: ", docRef.id);
      try {
        set(ref(db_broadcast, docRef.id), {
          svgLines : ""
        });
        console.log("Broadcast written");
      } catch (e) {
        console.error("Error adding broadcast: ", e);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  return(
    <Form>
      <Loader style={{display: loading ? "flex" : "none"}}>
        <PacmanLoader
        color={"#ea638c"}
        loading={true}
        size={50}
        />
      </Loader>
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
            name="number" 
            type="range" 
            max="5" 
            min="2" 
            value={maxNumber} 
            onChange={(e) => setMaxNumber(parseInt(e.target.value))} 
          />
          <label htmlFor="number">Max Number: {maxNumber}</label>
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
          <label htmlFor="time"> Time: {time}s</label>
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
  width:30vw;
  height:50vh;
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

const Loader = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  top:0px;
  right:0px;
  z-index:100;
  background:white;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  overflow:hidden;
`

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
