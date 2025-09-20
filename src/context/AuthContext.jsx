import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../util/firebaseConfig';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  logout: () => {},
});

function authReducer(state, action) {
  //* Updates the user state when Firebase auth state changes
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload, //* Sets the current user (or null if logged out)
      loading: false, //* Stops the loading state since we now know the auth status
      isAuthenticated: !!action.payload, //* Converts user to boolean (true if user exists, false if null)
    };
  }
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
    };
  }
  return state;
}

export default function AuthContextProvider({ children }) {

  const [authState, authDispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    authDispatch({ type: "SET_LOADING", payload: true });
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      authDispatch({
        type: "SET_USER",
        payload: user,
      });
    });

    return () => unsubscribe();
  }, []);

  function handleLogout() {
    signOut(auth).catch((error) => {
      console.error("Error logging out:", error);
    });
    authDispatch({
      type: "LOGOUT",
    });
  }

  const contextValues = {
    user: authState.user,
    loading: authState.loading,
    isAuthenticated: authState.isAuthenticated,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}

