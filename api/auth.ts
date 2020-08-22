const API_ENDPOINT = "http://localhost:4000";

type LoginArgs = {
  email: string;
  password: string;
};

export async function apiLogin({ email, password }: LoginArgs): Promise<any> {
  return fetch(`${API_ENDPOINT}/api/users/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

type SignupArgs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function apiSignup({
  firstName,
  lastName,
  email,
  password,
}: SignupArgs): Promise<any> {
  return fetch(`${API_ENDPOINT}/api/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    }),
  });
}
