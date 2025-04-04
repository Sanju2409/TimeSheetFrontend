export const authConfig = {
    clientId: 'Timeclient',
    clientSecret: 'dSLIMUKj3njaQbVxsW4n2RLeHhmSoJez', // only needed server-side
    authorizationEndpoint: 'http://localhost:8080/realms/Time/protocol/openid-connect/auth',
    tokenEndpoint: 'http://localhost:8080/realms/Time/protocol/openid-connect/token',
    redirectUri: 'http://localhost:5185',
    scopes: ['openid', 'profile', 'email'],
  };
  
  