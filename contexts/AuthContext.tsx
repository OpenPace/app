import React, { createContext, useContext, useEffect, useReducer } from "react";
import { loadAuth } from '../services/AuthService';
import User from '../api/models/User';

// Types
type State = {
  isLoggedIn: boolean;
  user?: User;
  token?: string;
  error?: string;
};

type Action = {
  type: string;
  user?: User;
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
  user: undefined,
  token: undefined,
  error: undefined,
};

export const AuthContext = createContext<ContextType>({} as any);

// Actions
export const RESTORE_AUTH = 'RESTORE_AUTH';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Action creators
export function restoreAuth(token: string, user: User): Action {
  return { type: RESTORE_AUTH, token, user };
}

export function loginSuccess(token: string, user: User): Action {
  return { type: LOGIN_SUCCESS, token, user };
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
    case RESTORE_AUTH:
      return { isLoggedIn: true, token: action.token, user: action.user };
    case LOGIN_SUCCESS:
      return { isLoggedIn: true, token: action.token, user: action.user };
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
        const {token, user} = await loadAuth();

        if (token && user) {
          dispatch(restoreAuth(token, user));
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
