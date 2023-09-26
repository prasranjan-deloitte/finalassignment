export default {
  oidc: {
    issuer: "https://dev-01926629.okta.com/oauth2/default",
    clientId: "0oabjhbt9wHjtLcAA5d7",
    scopes: ["openid", "profile", "email"],
    redirectUri: "http://localhost:3000/login/callback",
  },
  widget: {
    issuer: "https://dev-01926629.okta.com/oauth2/default",
    clientId: "0oabjhbt9wHjtLcAA5d7",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
  },
};
