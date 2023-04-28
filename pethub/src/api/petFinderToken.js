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

    body: 'grant_type=client_credentials&client_id=TR8jV8759ziO6wX1CJcRdXX3yYObYcfgVoQkzRhr1YOnKfWEmM&client_secret=70jGW9TISM6xLAdCQOeiDyZa0XFXvj8j5LkW1EVW'
  });

  const json = await response.json();
  token = json.access_token;
  // Set expiration to an hour from now
  tokenExpiration = Date.now() + 60 * 60 * 1000;
  return token;
};

export { fetchToken };
