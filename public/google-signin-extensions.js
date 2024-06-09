function parseJwt(jwt) {
  let base64Url = jwt.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

async function getUserAuthToken(gmailId) {
  const client = google.accounts.oauth2.initTokenClient({
    client_id: sessionStorage.getItem("CLIENT_ID"),
    scope:
      "https://www.googleapis.com/auth/userinfo.profile \
          https://www.googleapis.com/auth/drive.appdata \
          https://www.googleapis.com/auth/drive.install \
          https://www.googleapis.com/auth/drive.file",
    hint: gmailId,
    prompt: "",
    callback: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      if (accessToken !== undefined) {
        sessionStorage.setItem("USER_GOOGLE_AUTH_TOKEN", accessToken);
      }
    }
  });
  client.requestAccessToken();
}

function handleCredentialResponse(response) {
  const userInfo = parseJwt(response.credential);
  getUserAuthToken(userInfo.email);
}
