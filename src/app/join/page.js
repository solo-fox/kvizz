'use client'

import styled from "styled-components";
import Button3D from "../universal/Button";
import JoinFullIcon from '@mui/icons-material/JoinFull'
import {
  useRouter
} from "next/navigation"
import {
  useState
} from "react"
import {
  ToastContainer,
  toast
} from 'react-toastify'
import {
  room_exists
} from "../db/room"

export default function Home() {
  const [pin,
    setPin] = useState("")
  const router = useRouter();

  const go = () => {
    toast.promise(
      room_exists(pin),
      {
        pending: {
          render() {
            return "Searching..."
          }
        },
        success: {
          render({
            data
          }) {
            router.push(`/cuser/${pin}`)
            return `Redirect...`
          },
        },
        error: {
          render({
            data
          }) {
            return " No room was found!"
          }
        }
      }
    )
  }

  return(
    <Main>
      <ToastContainer />
      <Form>
        <input placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
        <Button3D
      b1={"hsl(342deg 100% 32%)" }
      b2={"hsl(340deg 100% 47%)"}
      onClick={go}
      >
          <JoinFullIcon /> Join
        </Button3D>
      </Form>
    </Main>
)
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
align-items:center;
justify-content:center;
`

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
padding:0.2rem 0.1rem;
outline:none;
text-align: center;
font-size: 1.5rem;
font-weight:800;
border-bottom: 1px solid black;
}

@media only screen and (max-width: 768px) {
width:80vw;
}
`;