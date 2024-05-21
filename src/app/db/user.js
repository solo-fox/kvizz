import {
  nanoid
} from 'nanoid'
import {
  db_store
} from '../firebase';
import {
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";


export function create_user(room_id, nickname) {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = nanoid();
      const roomRef = doc(db_store, "rooms", room_id);
      const roomSnap = await getDoc(roomRef);
      const room_max_users = roomSnap.data().room.usersnumber;
      const currentData = roomSnap.data().users;
      if(Object.keys(currentData).length == room_max_users) {
        reject("full")
        return;
      }
      updateDoc(roomRef, {
        users: {
          ...currentData,
          [userId]: {
            name: nickname,
            host: false,
            score: 0,
            onTurn: false
          }
        }
      })
      resolve(
        userId
      )
      console.log("User created")
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

export function is_user(room_id, user_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const roomRef = doc(db_store, "rooms", room_id);
      const roomSnap = await getDoc(roomRef);
      const currentData = roomSnap.data().users;
      if (user_id in currentData) {
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