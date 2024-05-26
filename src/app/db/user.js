import {
  nanoid
} from 'nanoid'
import { dbStore } from '../firebase';
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion
} from "firebase/firestore";


export function create_user(room_id, nickname) {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = nanoid();
      const roomRef = doc(dbStore, "rooms", room_id);
      const roomSnap = await getDoc(roomRef);
      const room_max_users = roomSnap.data().room.usersnumber;
      const currentData = roomSnap.data().users;
      if(currentData.length == room_max_users) {
        reject({
          reason: "full"
        })
        return;
      }
      updateDoc(roomRef, {
        users: arrayUnion(
          {
            id: userId,
            name: nickname,
            host: false,
            score: 0,
            onTurn: false,
            typing: false
          }
        )
      })
      resolve({
        user_id: userId
      })
      console.log("User created")
    } catch (e) {
      console.error(e)
      reject({
        reason: "error",
        error: e
      })
    }
  })
}

export function is_user(room_id, user_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const roomRef = doc(dbStore, "rooms", room_id);
      const roomSnap = await getDoc(roomRef);
      const currentData = roomSnap.data().users;
      if (currentData.some(user => user["id"] == user_id)) {
        resolve(user_id)
      } else {
        reject(user_id)
      }
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}