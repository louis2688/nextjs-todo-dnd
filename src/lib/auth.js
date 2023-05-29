import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { app } from './firebase';
import { createUser } from './bd';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

export const authenticate = getAuth(app);
//Formate a user with some attricutes
const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
  };
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleUser = (rawUser, result) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const details = getAdditionalUserInfo(result);
      if (details.isNewUser) createUser(user.uid);
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false); // cookie.remove('fast-feedback-auth');
      setLoading(false);
      return false;
    }
  };
  //Function sign in with github
  const signinWithGitHub = () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {

        setLoading(true);
        handleUser(result.user, result);
      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
     
        const email = error.email;

        const credential = GithubAuthProvider.credentialFromError(error);
 
      });
  };
  //Fucntion sign in with google
  const signinWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        
        setLoading(true);
        handleUser(result.user, result);
 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.email;

        const credential = GoogleAuthProvider.credentialFromError(error);

      });
  };

  const signout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {

        setUser(false);
      })
      .catch((error) => {

      });
  };
  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
}
