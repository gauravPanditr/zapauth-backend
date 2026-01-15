export  interface JwtDecodedAdmin {
    id: string;
    email: string;
    username: string;
    iat: number;
    exp: number;
}
export interface JwtDecodedUser{
    id:string;
    email:string;
    projectId:string
}