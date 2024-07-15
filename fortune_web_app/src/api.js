// Just hardcoding this here until we need to actually deploy this somewhere
const API_HOST = "http://localhost:8000";

export const getRandomFortune = async () => {
  const url = `${API_HOST}/api/fortune/`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const json = await response.json();
  return json;
};

// TODO: Remove this - only for testing
export const getRandomFortuneButSlower = () => {
  const url = `${API_HOST}/api/fortune/`;
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      return resolve(json);
    }, 2000);
  });
};

export const addFortune = async (fortune) => {
  const url = `${API_HOST}/api/fortune/add`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: fortune }),
  });
  const json = await response.json();
  return json;
};
