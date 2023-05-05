let token = null;
let tokenExpiration = 0;

const fetchToken = async () => {
  if (token && Date.now() < tokenExpiration) {
    return token;
  }

  const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },

    body: 'grant_type=client_credentials&client_id=zUwlQLdbpwyFalzBCWEeYyijJKRO9YzZwsAkBCEAGnKRaPN34b&client_secret=14NHGHL2bK132aXimartIeJyD9dYwDi4INMGKAhG'
  });

  const json = await response.json();
  token = json.access_token;
  // Set expiration to an hour from now
  tokenExpiration = Date.now() + 60 * 60 * 1000;
  return token;
};

export { fetchToken };
