// Admin JWT
export interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

// User JWT
export interface JwtPayloadUser {
  id: string;
  email: string;
  projectId?: string;
}
