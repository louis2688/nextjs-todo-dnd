import React, { useEffect, useReducer, createContext } from 'react';
import { reducer } from './todoReducer';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/auth';

const TodoContext = createContext();

const initialState = {
  todos: [],
  visibilityFilter: 'All',
  uid: '',
};

function TodoContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const auth = useAuth();

  const getTodos = async () => {
    const q = query(collection(db, 'users'), where('uid', '==', auth.user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const todos = Array.from(doc.data().todos); // Convert to array
      dispatch({
        type: 'INITIALIZE_TODO',
        payload: {
          todos,
          uid: doc.data().uid,
        },
      });
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}

export { TodoContext, TodoContextProvider };
