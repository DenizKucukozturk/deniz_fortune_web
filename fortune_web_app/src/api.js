// Just hardcoding this here until we need to actually deploy this somewhere
const API_URL = "http://localhost:8000/api/fortune/";

export const getRandomFortune = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const json = await response.json();
  return json;
};

export const addFortune = async (fortune) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: fortune }),
  });
  const json = await response.json();
  return json;
};
