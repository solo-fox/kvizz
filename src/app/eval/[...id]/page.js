'use client'

import {
  useParams
} from 'next/navigation'
import styled from 'styled-components'
import {
  useState,
  useEffect
} from 'react'
import {
  doc,
  getDoc
} from "firebase/firestore";
import {
  dbStore
} from '../../firebase';
import Err from "../../universal/error";
import Loading from "../../universal/Loading";

export default function Eval() {
  const {
    id
  } = useParams();
  let room_id = id[0]
  const [topUsersList,
    setTopUsers] = useState([]);
  const [valid,
    setValid] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const roomRef = doc(dbStore, "rooms", room_id);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        const currentUsers = roomSnap.data().users;
        const topUsers = currentUsers.sort((a, b) => b.score - a.score).slice(0, 3);
        setTopUsers(topUsers);
        setValid(true)
      } else {
        setValid(false)
      }
    }
    getUsers()
  },
    []);

  return (
    <Main>
      <div className="con">
      {valid === true ? (
        <>
        <p>
The Game is over, What a release!
        </p>
        <div className="scores">
      <div className="f3 line">
        <p className="name">
          {topUsersList[2]?.name ?? "None"}
        </p>
        <p className="number">
          {topUsersList[2]?.score ?? "None"}
        </p>
        </div>
      <div className="f1 line">
        <p className="name">
            {topUsersList[0]?.name ?? "None"}
          </p>
        <p className="number">
          {topUsersList[0]?.score ?? "None"}
          </p>
        </div>
      <div className="f2 line">
        <p className="name">
            {topUsersList[1]?.name ?? "None"}
          </p>
        <p className="number">
        {topUsersList[1]?.name ?? "None"}
          </p>
        </div>
        </div> < />
      ): valid === null ? (
        <Err msg="Invalid ID" />
      ): (
        <Loading />
      )}
    </div>
    </Main>
  );

}

  const Main = styled.div`
  background-color: #002A22;
  background-image: linear-gradient(135deg, #002A22 25%, transparent 25%),
  linear-gradient(225deg, #002A22 25%, transparent 25%),
  linear-gradient(45deg, #002A22 25%, transparent 25%),
  linear-gradient(315deg, #002A22 25%, #fefefe 25%);
  background-position:
  24px 0,
  24px 0,
  0 0,
  0 0;
  background-size: 48px 48px;
  background-repeat: repeat;
  height: 89vh;
  width:100vw;
  overflow-y:hidden;
  display:flex;
  justify-content:center;
  align-items:center;
  .con{
  max-height:70vh;
  width:80vw;
  display:flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
  padding:0.5rem 1rem;
  position: relative;
  }
  .scores{
  display:flex;
  align-items:flex-end;
  justify-content:center;
  padding:1rem;
  }

  .f1{
  height:20vh;
  background-color:#ea638c;
  }
  .f2{
  height:15vh;
  background-color:#03012C;
  }
  .f3{
  height:10vh;
  background-color:#002A22;
  }
  .name{

  }

  .line{
  width:13vw;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-direction:column;
  font-size:12px;
  padding:0.5rem;
  color: white;
  font-weight:800;
  transition: 1s;
  &:hover{
  transform: scale(1.2);
  }
  }
  `