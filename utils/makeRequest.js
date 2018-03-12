export const makeRequest = async (url, method, body) => {
  let response = await fetch(url, {
    method,
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const simpleGetRequest = async url => {
  let response = await fetch(url);
  return await response.json();
};