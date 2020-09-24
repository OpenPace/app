import React, { createContext, useContext, useEffect, useReducer } from "react";
import { loadAuth } from "../services/AuthService";
import { getMe } from "../services/UserService";
import Credential from "../api/models/Credential";
import User from "../api/models/User";

// Types
type State = {
  loading: boolean;
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
  credential?: Credential;
};

type ContextType = {
  auth: State;
  dispatch: any;
};

// Initial state
const initialState: State = {
  loading: true,
  isLoggedIn: false,
  user: undefined,
  token: undefined,
  error: undefined,
};

export const AuthContext = createContext<ContextType>({} as any);

// Actions
export const RESTORE_SUCCESS = "RESTORE_SUCCESS";
export const RESTORE_FAIL = "RESTORE_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const CREDENTIAL_ADDED = "CREDENTIAL_ADDED";

// Action creators
export function restoreFail(): Action {
  return { type: RESTORE_FAIL };
}

export function restoreSuccess(token: string, user: User): Action {
  return { type: RESTORE_SUCCESS, token, user };
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

export function credentialAdded(credential: Credential): Action {
  return { type: CREDENTIAL_ADDED, credential };
}

// Reducer
export function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case RESTORE_SUCCESS:
      return {
        isLoggedIn: true,
        loading: false,
        token: action.token,
        user: action.user,
      };
    case RESTORE_FAIL:
      return { isLoggedIn: false, loading: false };
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        loading: false,
        token: action.token,
        user: action.user,
      };
    case LOGIN_FAIL:
      return { isLoggedIn: false, loading: false, error: action.error };
    case LOGOUT:
      return { isLoggedIn: false, loading: false };
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
        const { token } = await loadAuth();
        const user = await getMe({ authToken: token });

        dispatch(restoreSuccess(token, user));
      } catch (e) {
        // Restoring token failed
        dispatch(restoreFail());
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
