import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

//* Alternative way to get the currently logged in user using a custom hook
export function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //* When onAuthStateChanged is called, it immediately subscribes to auth changes and returns an unsubscribe function.
    const unsubscribe = onAuthStateChanged(auth, setUser);
    
    //* When the component unmounts, the unsubscribe function is called to clean up the subscription.
    return () => unsubscribe();
  }, []);

  return user;
}


