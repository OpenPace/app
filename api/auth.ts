import { apiPost } from "./client";

type LoginParams = {
  email: string;
  password: string;
};

export async function apiLogin(params: LoginParams): Promise<any> {
  return apiPost("/users/signin", params);
}

type SignupParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function apiSignup(params: SignupParams): Promise<any> {
  return apiPost("/users/signup", params);
}
