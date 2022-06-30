export const callApiWithToken = async (accessToken, apiEndpoint) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
    mode: "no-cors",
  };

  return fetch(apiEndpoint, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
