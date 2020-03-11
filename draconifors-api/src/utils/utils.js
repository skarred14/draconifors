const fetch = require('node-fetch');

export default async (route, method, data) => {
  const res = await fetch(route, {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = res.json();

  return result;
};
