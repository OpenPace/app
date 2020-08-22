export async function apiLogin(email: string, password: string): Promise<any> {
  const ms = 2000;
  return new Promise(resolve => {
    console.log(email);
    console.log(password);
    console.log('login start')
    setTimeout(() => {
      console.log('login done')
      resolve();
    }, ms);
  });
};

export async function apiSignup(name: string, email: string, password: string): Promise<any> {
  const ms = 2000;
  return new Promise(resolve => {
    console.log(name);
    console.log(email);
    console.log(password);
    console.log('sign up start')
    setTimeout(() => {
      console.log('sign up done');
      resolve();
    }, ms);
  });
};
