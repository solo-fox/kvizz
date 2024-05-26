import Button3D from "../../../universal/Button";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components'

export default function CopySection ({ roomId, copied, setCopied }){
  return(
    <Copy>
      <div className="overflow-scroll">
        <span className="text-nowrap">{`${roomId}`}</span>
      </div>
      <ButtonCon>
        <CopyToClipboard text={`${roomId}`} onCopy={() => setCopied(true)}>
          <Button3D b1={"hsl(345deg 100% 47%)"} b2={"hsl(342deg 76% 65%)"}>
            <p>{copied ? "copied" : "Copy"}</p>
          </Button3D>
        </CopyToClipboard>
      </ButtonCon>
    </Copy>
  )
}
const Copy = styled.div`
width: 100%;
border: 1px solid #002A22;
border-radius: 5px;
padding:1rem;
position:relative;
overflow: hidden;
`


const CopyLink = styled(CopyToClipboard)`
`

const ButtonCon = styled.div`
position:absolute;
right:0px;
top:50%;
transform: translate(0%,-50%);
background:linear-gradient(to left, hsl(345deg,100%,47%,0.5), rgba(255,255,255,0));
height:100%;
width:40%;
display:flex;
align-items:center;
justify-content: center;
`