import {
  setWord
} from "../../db/play"
import {
  startGame
} from "../../db/play";

export async function POST(req, res) {
  const body = await req.json()
  const fetchData = await fetch("http://localhost:3000/words.json")
  const data = await fetchData.json();
  let randomIndex = Math.floor(Math.random()*data["words"].length);
  let randomItem = [data["words"][randomIndex]]
  try {
    const xyz = await setWord(body.roomId, randomItem[0])
    const start = await startGame(body.roomId, body.onTurnUserId);
    return new Response(JSON.stringify({
      payload: randomItem
    }), {
      status: 200
    });
  } catch(error) {
    return new Response(JSON.stringify({
      payload: error
    }), {
      status: 400
    });
  }
}