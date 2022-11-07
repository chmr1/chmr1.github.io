interface Config {
  [key: string]: string;
}

// Session auth needs to use the same origin anyway
export const config: Config = {
  apiUrl: 'https://635182043e9fa1244e608313.mockapi.io/crudcomplete',
};
