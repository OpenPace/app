import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store';

// Types
type State = {
  isLoggedIn: boolean;
  token?: string;
  error?: string;
};

type Action = {
  type: string;
  token?: string;
  error?: string;
};

type ContextType = {
  auth: State;
  dispatch: any,
}

// Initial state
const initialState: State = {
  isLoggedIn: false,
  token: undefined,
  error: undefined,
};

export const AuthContext = createContext<ContextType>({} as any);

// Actions
export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Action creators
export function restoreToken(token: string): Action {
  return { type: RESTORE_TOKEN, token };
}

export function loginSuccess(token: string): Action {
  return { type: LOGIN_SUCCESS, token };
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
      return { isLoggedIn: true, token: action.token };
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
        let token: string | null;

        if (Platform.OS === 'web') {
          token = await AsyncStorage.getItem('authToken');
        } else {
          token = await SecureStore.getItemAsync('authToken');
        }

        if (token) {
          dispatch(restoreToken(token));
        }
      } catch (e) {
        // Restoring token failed
      }
    }

    loadUser();
  }, []);

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider> ;
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
