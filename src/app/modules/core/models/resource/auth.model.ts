export interface ISigninRequest {
  credential: string;
  password: string;
}

export interface ISigninResponse {
  token: string;
}

export interface IPayload {
  id: number;
  role: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
  online: boolean
}
