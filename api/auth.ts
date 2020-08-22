export async function apiLogin(email: string, password: string): Promise<any> {
  const ms = 5000;
  return new Promise(resolve => {
    console.log(email);
    console.log(password);
    console.log('starting api')
    setTimeout(() => {
      console.log('done');
      resolve();
    }, ms);
  });
};

export async function apiSignup(name: string, email: string, password: string): Promise<any> {
};
