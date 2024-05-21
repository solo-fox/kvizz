'use client'

import styled from 'styled-components'
import Err from "../../../universal/error";
import Loading from "../../../universal/Loading";
import Users from "./Users";
import {room_exists} from "../../../db/room";
import {is_user} from "../../../db/user";
import { useState, useEffect } from "react";

export default function UsersList({ room_id, user_id }) {
  const [valid, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  
  useEffect(()=> {
    const user_id_local = localStorage.getItem('user_id');
    if (user_id_local !== null) {
      is_user(room_id, user_id)
      .then((user_id) => {
        setLoggedIn(true)
        setLoading1(false)
      }).catch((error) => {
        setLoggedIn(false)
        setLoading1(false)
      })
    } else {
      setLoggedIn(false)
      setLoading1(false)
    }
  })

  useEffect(() => {
    room_exists(room_id) 
    .then(() => {
      setState(true)
      setLoading(false)
    }).catch((error) => {
      setState(false)
      setLoading(false)
    });
  })
  
  return(
    <List>
    {
      loggedIn === false ? (
        <Err msg="WHO ARE YOU???" />
      ) : loggedIn === true ? (
        valid === false ? (
          <Err msg="Room ID is Invalid" />
        ) : valid === true ? (
          <Users room_id={room_id} user_id={user_id} />
        ) : (
          <Loading state={loading} />
        )
      ) : (
        <Loading state={loading} />
      )
    }
    </List>
  );
}

const List = styled.div`
  position:relative;
  background: white;
  width:40vw;
  height:60vh;
  border-radius:5px;
  padding:1rem 1.5rem;
  gap:1rem;
  overflow:hidden;
  -webkit-box-shadow: 5px 10px 15px -5px rgba(88,25,8,0.73); 
  box-shadow: 5px 10px 15px -5px rgba(88,25,8,0.73);
  
  .play {
    background: lime;
    padding: 0.5rem 1rem;
    border-radius:5px;
    width:100%;
  }
  
  @media only screen and (max-width: 768px) {
    width:80vw;
  }
`;