export const URL =
  "https://propetro-qa.intelie.com/services/plugin-propetro-intern-virtual/propetro/integrations/intern/virtual/active-pump-values-by-pump/";

export async function getIntelliData(url = URL) {
  console.log(process.env);
  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.REACT_APP_INTELLI_AUTHORIZATION}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: {},
  });
  return response.json();
}
