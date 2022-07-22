export const URL = "https://intelli-bridge.azurewebsites.net/api/v1/pumps";

export async function getIntelliData(url = URL) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  });
  return response.json();
}
