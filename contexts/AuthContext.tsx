import React, { createContext, useContext, useEffect, useReducer  } from "react";
import AsyncStorage from '@react-native-community/async-storage';

// Types
type State = {
  isLoggedIn: boolean;
  name?: string;
  error?: string;
};

type Action = {
  type: string;
  name?: string;
  error?: string;
};

type ContextType = {
  auth: State;
  dispatch: any,
}

// Initial state
const initialState: State = {
  isLoggedIn: false,
  name: undefined,
  error: undefined,
};

export const AuthContext = createContext<ContextType>({} as any);

// Actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Action creators
export function loginSuccess(name: string): Action {
  return { type: LOGIN_SUCCESS, name };
}

export function loginFail(error: string): Action {
  return { type: LOGIN_FAIL, error };
}

export function logout(): Action {
  return { type: LOGOUT };
}

// Reducer
export function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { isLoggedIn: true, name: action.name };
    case LOGIN_FAIL:
      return { isLoggedIn: false, error: action.error };
    case LOGOUT:
      return { isLoggedIn: false };
    default:
      return state;
  }
}

function AuthProvider({ children }: React.PropsWithChildren<any>) {
  const [auth, dispatch] = useReducer(authReducer, initialState);

  const authData = { auth, dispatch };

  useEffect(() => {
    async function loadUser() {
      try {
        await AsyncStorage.setItem('name', 'Evan');
        const test = await AsyncStorage.getItem('name');
        console.log(test);
      } catch (e) {
        // Restoring token failed
      }

      // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    }

    loadUser();
  }, []);

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider> ;
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
