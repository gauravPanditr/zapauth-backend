import jwt from "jsonwebtoken";

export interface DecodedProjectKey {
  projectId?: string;
  ownerId?: string;
}

export function decodeProjectKey(token: string): DecodedProjectKey | null {
  return jwt.decode(token) as DecodedProjectKey | null;
}
