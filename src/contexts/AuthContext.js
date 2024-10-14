import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import app from '../firebase';
//import { auth } from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

//NOTE: this is not "default" export.
export const AuthProvider = ({ children }) => {

    const[currentUser, setCurrentUser] = useState();

    const auth = getAuth(app);
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {

         //whenever we'll call auth.createUserWithEmailAndPassword (above), this will trigger onAuthStateChanged and will set the current user
         //we put this in useEffect because we only want to run this when we mount our component
         var unsubscribe = onAuthStateChanged(auth, user => {
                setCurrentUser(user)
            });
        
        return unsubscribe;

    }, [auth])


    const value = {
        currentUser,
        signup
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

