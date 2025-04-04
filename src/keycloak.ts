export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }
  
  export async function exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:3000',
      client_id: 'Timeclient',
      client_secret: 'dSLIMUKj3njaQbVxsW4n2RLeHhmSoJez',
    });
  
    const response = await fetch('http://localhost:8084/realms/Time/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
  
    if (!response.ok) {
      throw new Error('Token exchange failed');
    }
  
    return response.json();
  }
  