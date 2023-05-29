import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export function createUser(uid) {

  const user = doc(collection(db, 'users'), uid);
  setDoc(user, { uid, todos: [] }, { merge: true });
}
