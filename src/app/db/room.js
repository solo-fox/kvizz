import {
  nanoid
} from 'nanoid'
import {
  collection,
  addDoc,
  doc,
  getDoc
} from "firebase/firestore";
import {
  db_broadcast,
  db_store
} from '../firebase';
import {
  ref,
  set
} from "firebase/database";

export async function create_room (
  nickname,
  isPublic,
  usersnumber,
  time,
  rounds
) {
  return new Promise(async (resolve, reject) => {
    let userId = nanoid();
    let room = {
      isPublic,
      usersnumber,
      time,
      rounds,
      redirect: false,
      playIsOn: false,
      word: "Dog"
    }
    let users = {
      [userId]: {
        name: nickname,
        host: true,
        score: 0,
        onTurn: true
      }
    }
    try {
      const docRef = await addDoc(collection(db_store, "rooms"), {
        room,
        users
      });
      console.log("Document written with ID: ", docRef.id);
      try {
        await set(ref(db_broadcast, docRef.id), {
          svgLines: ""
        });
        console.log("Broadcast written");
        resolve({
          room_id: docRef.id,
          user_id: userId
        });
      } catch (e) {
        console.error("Error adding broadcast: ", e);
        reject(e);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      reject(e);
    }
  });
}

export function room_exists(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db_store, "rooms", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resolve()
      } else {
        reject()
      }
    }catch(e) {
      reject(e)
    }
  })
}

export function beginn_cycle(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db_store, "rooms", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resolve()
      } else {
        reject()
      }
    }catch(e) {
      reject(e)
    }
  })
}